"""
Grant Calibration Engine V4
SOTA Business Plan Analysis for Gründungszuschuss

NEW FEATURES:
- Positive aspects detection ("Was bereits gut ist")
- Potential score calculation (Score nach Fixes)
- Time and impact estimates per fix
- Personalized summary with business name
- Copy-paste texts for all warnings/errors
"""

import os
import json
from typing import Dict, List, Optional
from anthropic import Anthropic


# ============================================
# 27 BA GZ 04 KRITERIEN DEFINITION
# ============================================

BA_GZ_04_CRITERIA = {
    "grundvoraussetzungen": {
        "name": "Grundvoraussetzungen",
        "criteria": [
            {"id": "G1", "name": "Solo-Selbständigkeit", "description": "Gründung als Einzelperson", "max_points": 5},
            {"id": "G2", "name": "Einzelunternehmen/Freiberufler", "description": "Keine Kapitalgesellschaft", "max_points": 5},
            {"id": "G3", "name": "Keine Gesellschafter", "description": "Alleinige Inhaberschaft", "max_points": 4},
            {"id": "G4", "name": "Keine Angestellten Jahr 1", "description": "Solo-Start ohne Personal", "max_points": 5},
            {"id": "G5", "name": "Haupterwerb geplant", "description": "Mindestens 15 Stunden/Woche", "max_points": 4},
            {"id": "G6", "name": "ALG-Anspruch vorhanden", "description": "Mindestens 150 Tage Restanspruch", "max_points": 3},
        ]
    },
    "finanzplanung": {
        "name": "Finanzplanung",
        "criteria": [
            {"id": "F1", "name": "Realistische Umsatzprognose", "description": "Jahr 1: €40-60K typisch", "max_points": 6},
            {"id": "F2", "name": "Kostenaufstellung", "description": "Alle Betriebskosten erfasst", "max_points": 4},
            {"id": "F3", "name": "Liquiditätsplanung", "description": "Monatliche Cashflow-Übersicht", "max_points": 4},
            {"id": "F4", "name": "Break-Even Analyse", "description": "Gewinnschwelle definiert", "max_points": 3},
            {"id": "F5", "name": "Kapitalbedarf", "description": "Startkapital und Reserven", "max_points": 4},
            {"id": "F6", "name": "Privatentnahmen", "description": "Lebenshaltungskosten berücksichtigt", "max_points": 3},
        ]
    },
    "marktanalyse": {
        "name": "Marktanalyse",
        "criteria": [
            {"id": "M1", "name": "Zielgruppe definiert", "description": "Konkrete Kundenbeschreibung", "max_points": 4},
            {"id": "M2", "name": "Wettbewerbsanalyse", "description": "Konkurrenten identifiziert", "max_points": 4},
            {"id": "M3", "name": "USP formuliert", "description": "Alleinstellungsmerkmal klar", "max_points": 4},
            {"id": "M4", "name": "Marktgröße", "description": "Realistisches Marktpotenzial", "max_points": 3},
            {"id": "M5", "name": "Preiskalkulation", "description": "Nachvollziehbare Preise", "max_points": 3},
        ]
    },
    "geschaeftsmodell": {
        "name": "Geschäftsmodell",
        "criteria": [
            {"id": "B1", "name": "Leistungsbeschreibung", "description": "Klare Produkt-/Dienstleistungsdefinition", "max_points": 4},
            {"id": "B2", "name": "Kundenakquise", "description": "Vertriebsstrategie vorhanden", "max_points": 3},
            {"id": "B3", "name": "Marketing-Mix", "description": "Werbemaßnahmen geplant", "max_points": 3},
            {"id": "B4", "name": "Standortwahl", "description": "Begründete Standortentscheidung", "max_points": 3},
        ]
    },
    "qualifikation": {
        "name": "Qualifikation & Erfahrung",
        "criteria": [
            {"id": "Q1", "name": "Fachliche Eignung", "description": "Branchenerfahrung/-ausbildung", "max_points": 4},
            {"id": "Q2", "name": "Kaufmännische Kenntnisse", "description": "BWL-Grundlagen vorhanden", "max_points": 3},
            {"id": "Q3", "name": "Branchenkontakte", "description": "Netzwerk für Kundengewinnung", "max_points": 3},
        ]
    },
    "risikobewertung": {
        "name": "Risikobewertung",
        "criteria": [
            {"id": "R1", "name": "Risiken identifiziert", "description": "Mögliche Probleme benannt", "max_points": 3},
            {"id": "R2", "name": "Gegenmaßnahmen", "description": "Strategien zur Risikominimierung", "max_points": 3},
            {"id": "R3", "name": "Plan B vorhanden", "description": "Alternative bei Misserfolg", "max_points": 2},
        ]
    }
}


def get_anthropic_client():
    """Get Anthropic client instance"""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY environment variable not set")
    return Anthropic(api_key=api_key)


def get_all_criteria_ids() -> List[str]:
    """Get flat list of all criteria IDs"""
    ids = []
    for category in BA_GZ_04_CRITERIA.values():
        for criterion in category["criteria"]:
            ids.append(criterion["id"])
    return ids


def get_criterion_info(criterion_id: str) -> Dict:
    """Get criterion info by ID"""
    for category in BA_GZ_04_CRITERIA.values():
        for criterion in category["criteria"]:
            if criterion["id"] == criterion_id:
                return criterion
    return {"id": criterion_id, "name": criterion_id, "max_points": 3}


def calculate_potential_score(current_score: int, checklist: Dict, fixes: Dict) -> int:
    """Calculate potential score after applying all fixes"""
    # Count fixable issues
    fixable_points = 0
    for cid, status in checklist.items():
        if status.upper() in ["WARNUNG", "FEHLER"] and cid in fixes:
            criterion = get_criterion_info(cid)
            # Estimate recoverable points (70-90% of max for that criterion)
            max_pts = criterion.get("max_points", 3)
            if status.upper() == "FEHLER":
                fixable_points += int(max_pts * 0.85)
            else:  # WARNUNG
                fixable_points += int(max_pts * 0.5)
    
    potential = min(current_score + fixable_points, 95)  # Cap at 95
    return potential


def calculate_total_time(fixes: Dict, issues: List[Dict]) -> int:
    """Calculate total estimated time in minutes"""
    total = 0
    for fix in fixes.values():
        total += fix.get("time_minutes", 10)
    for issue in issues[:3]:
        total += issue.get("time_minutes", 15)
    return total


def map_analysis_for_pdf(raw_analysis: Dict) -> Dict:
    """Map Claude's analysis response to PDF generator format"""
    
    # Extract revenue data
    revenue_comparison = raw_analysis.get("revenue_comparison", {})
    plan_revenue = revenue_comparison.get("plan", "N/A")
    benchmark = revenue_comparison.get("ihk_benchmark", "N/A")
    
    # Format revenue strings
    if isinstance(plan_revenue, (int, float)):
        estimated_revenue = f"€{plan_revenue:,.0f}".replace(",", ".")
    else:
        estimated_revenue = str(plan_revenue) if plan_revenue else "N/A"
    
    if isinstance(benchmark, (int, float)):
        benchmark_revenue = f"€{benchmark:,.0f}".replace(",", ".")
    elif isinstance(benchmark, str) and benchmark:
        if "-" in benchmark:
            parts = benchmark.replace(".", "").split("-")
            try:
                low = int(parts[0])
                high = int(parts[1])
                benchmark_revenue = f"€{low:,.0f} - €{high:,.0f}".replace(",", ".")
            except (ValueError, IndexError):
                benchmark_revenue = benchmark
        else:
            benchmark_revenue = benchmark
    else:
        benchmark_revenue = "€40.000 - €60.000"
    
    # Calculate potential score
    checklist = raw_analysis.get("criteria_checklist", {})
    fixes = raw_analysis.get("criteria_fixes", {})
    current_score = raw_analysis.get("score", 0)
    potential_score = calculate_potential_score(current_score, checklist, fixes)
    
    # Calculate total time
    total_time = calculate_total_time(fixes, raw_analysis.get("issues", []))
    
    # Map to PDF generator format
    mapped_result = {
        "score": current_score,
        "potential_score": potential_score,
        "score_improvement": potential_score - current_score,
        "risk_level": raw_analysis.get("risk_level", "MITTEL"),
        "summary": raw_analysis.get("summary", ""),
        "personalized_summary": raw_analysis.get("personalized_summary", ""),
        "top_issues": raw_analysis.get("issues", []),
        "detected_industry": raw_analysis.get("detected_industry", "Dienstleistung"),
        "business_name": raw_analysis.get("business_name", "Ihr Unternehmen"),
        "estimated_revenue": estimated_revenue,
        "benchmark_revenue": benchmark_revenue,
        "revenue_comparison": revenue_comparison,
        "criteria_checklist": checklist,
        "criteria_fixes": fixes,
        # NEW: Positive aspects
        "positive_aspects": raw_analysis.get("positive_aspects", []),
        "criteria_fulfilled_count": sum(1 for s in checklist.values() if s.upper() == "OK"),
        "criteria_total_count": len(checklist),
        # Time estimates
        "total_fix_time_minutes": total_time,
        "total_fixes_count": len(fixes),
    }
    
    return mapped_result


def analyze_business_plan(pdf_text: str, metadata: Optional[Dict] = None) -> Dict:
    """
    Analyze business plan with SOTA features:
    - Positive aspects detection
    - Potential score calculation
    - Time and impact estimates
    - Personalized summary
    """
    client = get_anthropic_client()
    
    # Build criteria list for prompt
    criteria_prompt = ""
    for cat_key, category in BA_GZ_04_CRITERIA.items():
        criteria_prompt += f"\n{category['name']}:\n"
        for c in category["criteria"]:
            criteria_prompt += f"  - {c['id']}: {c['name']} ({c['description']}) [Max: {c['max_points']} Punkte]\n"
    
    analysis_prompt = f"""Analysiere diesen deutschen Business Plan für Gründungszuschuss-Bewilligung.

BUSINESS PLAN TEXT:
{pdf_text[:8000]}

═══════════════════════════════════════════════════════════════
WICHTIG: ANTWORTE NUR AUF DEUTSCH! KEINE ENGLISCHEN BEGRIFFE!
═══════════════════════════════════════════════════════════════

ANALYSE-AUFGABEN:

1. BUSINESS NAME & BRANCHE ERKENNEN:
   Extrahiere den Firmennamen/Projektnamen und die Branche aus dem Text.

2. POSITIVE ASPEKTE IDENTIFIZIEREN ("Was bereits gut ist"):
   Liste 3-5 Dinge auf, die der Business Plan bereits gut macht.
   Das motiviert den User und zeigt, dass nicht alles schlecht ist.

3. SCORE BERECHNEN (0-100):
   - 85-100: Sehr gute Chancen (NIEDRIGES RISIKO)
   - 65-84: Gute Chancen (MITTLERES RISIKO)
   - 45-64: Moderate Chancen (HOHES RISIKO)
   - 0-44: Kritisch (KRITISCHES RISIKO)

4. TOP 3 ISSUES MIT ZEIT- UND IMPACT-SCHÄTZUNG:
   Für jedes Issue:
   - title: Kurze Problembeschreibung
   - description: Warum ist das ein Problem?
   - severity: "KRITISCH", "HOCH", oder "MITTEL"
   - fix: Kurze Anleitung
   - copy_paste_text: Fertiger Text (3-5 Sätze)
   - time_minutes: Geschätzte Zeit zur Behebung (5-30 Minuten)
   - impact_points: Geschätzte Punkteverbesserung (3-15 Punkte)
   - why_it_works: Warum diese Formulierung funktioniert (1-2 Sätze)

5. 27 KRITERIEN CHECKLISTE:
   Bewerte ALLE Kriterien: "OK", "WARNUNG", "FEHLER", "NICHT_GEFUNDEN"
{criteria_prompt}

6. KOPIERVORLAGEN FÜR ALLE WARNUNGEN/FEHLER:
   Mit Zeit- und Impact-Schätzung für jeden Fix.

7. PERSONALISIERTE ZUSAMMENFASSUNG:
   Schreibe eine 4-5 Sätze Zusammenfassung die:
   - Den Business-Namen verwendet
   - Die positiven Aspekte erwähnt
   - Die kritischen Punkte nennt
   - Mut macht ("Mit den Fixes erreichst du...")

ANTWORT ALS JSON:
{{
  "score": 42,
  "risk_level": "KRITISCH",
  "detected_industry": "Lebensmitteleinzelhandel",
  "business_name": "Foodlocal Market",
  "positive_aspects": [
    "Geschäftsidee klar und verständlich beschrieben",
    "Zielgruppe präzise definiert (LOHAS-Haushalte in Nürnberg)",
    "Fachliche Eignung durch Berufserfahrung nachgewiesen",
    "Standort strategisch gewählt und begründet",
    "Alleinstellungsmerkmal (100% regional) erkennbar"
  ],
  "issues": [
    {{
      "title": "Angestellte geplant - verstößt gegen Förderkriterien",
      "description": "Der Plan sieht zwei Verkaufskräfte vor, was den Gründungszuschuss ausschließt.",
      "severity": "KRITISCH",
      "fix": "Streiche die Angestellten und plane als Solo-Selbständige.",
      "copy_paste_text": "Ich gründe als Solo-Selbständige ohne Angestellte im ersten Geschäftsjahr. Die Öffnungszeiten beschränke ich auf 30 Stunden pro Woche, um eine persönliche Betreuung zu gewährleisten. Bei Bedarf arbeite ich mit freiberuflichen Aushilfen auf Honorarbasis.",
      "time_minutes": 15,
      "impact_points": 12,
      "why_it_works": "Die Formulierung 'Solo-Selbständige' und 'Honorarbasis' sind Schlüsselbegriffe, die Prüfer positiv bewerten. Sie zeigen, dass du die Förderkriterien verstanden hast."
    }},
    {{
      "title": "Zweites kritisches Problem",
      "description": "...",
      "severity": "KRITISCH",
      "fix": "...",
      "copy_paste_text": "...",
      "time_minutes": 20,
      "impact_points": 10,
      "why_it_works": "..."
    }},
    {{
      "title": "Drittes Problem",
      "description": "...",
      "severity": "HOCH",
      "fix": "...",
      "copy_paste_text": "...",
      "time_minutes": 25,
      "impact_points": 8,
      "why_it_works": "..."
    }}
  ],
  "criteria_checklist": {{
    "G1": "WARNUNG",
    "G2": "OK",
    "G3": "OK",
    "G4": "FEHLER",
    "G5": "OK",
    "G6": "NICHT_GEFUNDEN",
    "F1": "FEHLER",
    "F2": "WARNUNG",
    "F3": "NICHT_GEFUNDEN",
    "F4": "NICHT_GEFUNDEN",
    "F5": "FEHLER",
    "F6": "NICHT_GEFUNDEN",
    "M1": "OK",
    "M2": "WARNUNG",
    "M3": "WARNUNG",
    "M4": "WARNUNG",
    "M5": "NICHT_GEFUNDEN",
    "B1": "OK",
    "B2": "WARNUNG",
    "B3": "WARNUNG",
    "B4": "NICHT_GEFUNDEN",
    "Q1": "OK",
    "Q2": "OK",
    "Q3": "WARNUNG",
    "R1": "WARNUNG",
    "R2": "WARNUNG",
    "R3": "NICHT_GEFUNDEN"
  }},
  "criteria_fixes": {{
    "G1": {{
      "problem": "Teamgründung angedeutet",
      "copy_paste_text": "Ich gründe als Einzelperson ohne Geschäftspartner. Die gesamte unternehmerische Verantwortung liegt allein bei mir.",
      "time_minutes": 5,
      "impact_points": 4,
      "why_it_works": "Eindeutige Solo-Gründung signalisiert Förderfähigkeit."
    }},
    "G4": {{
      "problem": "Zwei Verkaufskräfte geplant",
      "copy_paste_text": "Im ersten Geschäftsjahr arbeite ich ohne Angestellte als Solo-Selbständige. Bei Bedarf arbeite ich mit freiberuflichen Aushilfen auf Honorarbasis.",
      "time_minutes": 10,
      "impact_points": 5,
      "why_it_works": "Honorarbasis ist rechtlich kein Arbeitsverhältnis und erfüllt die Solo-Anforderung."
    }},
    "F1": {{
      "problem": "Umsatz unrealistisch hoch",
      "copy_paste_text": "Meine realistische Umsatzplanung für das erste Jahr beträgt 145.000 Euro, basierend auf IHK-Branchenkennzahlen.",
      "time_minutes": 15,
      "impact_points": 6,
      "why_it_works": "IHK-Referenz zeigt fundierte Recherche und Realismus."
    }}
  }},
  "revenue_comparison": {{
    "plan": 589281,
    "ihk_benchmark": "120000-180000",
    "deviation_percent": 227
  }},
  "personalized_summary": "Dein Business Plan für den Foodlocal Market zeigt eine durchdachte Geschäftsidee mit echtem Marktpotenzial im regionalen Lebensmittelhandel. Die klare Zielgruppendefinition und deine Branchenerfahrung sind starke Pluspunkte. Allerdings verhindern drei kritische Punkte aktuell die Genehmigung: geplante Angestellte (K.O.-Kriterium), unrealistischer Umsatz und fehlende Kapitalbedarfsplanung. Die gute Nachricht: Mit den 13 Kopiervorlagen in diesem Report kannst du deinen Score von 42 auf geschätzte 78+ Punkte steigern - in etwa 3 Stunden Arbeit."
}}

WICHTIGE REGELN:
1. business_name: Extrahiere den echten Namen aus dem Business Plan!
2. positive_aspects: Mindestens 3, maximal 5 positive Punkte
3. time_minutes: Realistische Schätzung (5-30 Min pro Fix)
4. impact_points: Wie viele Punkte bringt dieser Fix (3-15)
5. why_it_works: Erkläre WARUM die Formulierung bei Prüfern funktioniert
6. personalized_summary: Verwende den Business-Namen, sei motivierend!
7. ALLE 27 Kriterien müssen bewertet werden
8. ALLES AUF DEUTSCH!

ANTWORTE NUR MIT VALIDEM JSON."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=8000,
            temperature=0.3,
            messages=[
                {
                    "role": "user",
                    "content": analysis_prompt
                }
            ]
        )
        
        response_text = response.content[0].text.strip()
        
        # Clean JSON
        if response_text.startswith("```json"):
            response_text = response_text.replace("```json", "").replace("```", "").strip()
        elif response_text.startswith("```"):
            response_text = response_text.replace("```", "").strip()
        
        raw_analysis = json.loads(response_text)
        
        # Validate and ensure minimum data
        if "issues" not in raw_analysis or len(raw_analysis.get("issues", [])) == 0:
            raw_analysis["issues"] = [create_fallback_issue()]
        
        while len(raw_analysis.get("issues", [])) < 3:
            raw_analysis["issues"].append(create_generic_issue(len(raw_analysis["issues"]) + 1))
        
        # Ensure all criteria present
        if "criteria_checklist" not in raw_analysis:
            raw_analysis["criteria_checklist"] = {cid: "NICHT_GEFUNDEN" for cid in get_all_criteria_ids()}
        else:
            for cid in get_all_criteria_ids():
                if cid not in raw_analysis["criteria_checklist"]:
                    raw_analysis["criteria_checklist"][cid] = "NICHT_GEFUNDEN"
        
        # Ensure criteria_fixes exists
        if "criteria_fixes" not in raw_analysis:
            raw_analysis["criteria_fixes"] = {}
        
        # Generate missing fixes
        checklist = raw_analysis["criteria_checklist"]
        fixes = raw_analysis["criteria_fixes"]
        for cid, status in checklist.items():
            if status.upper() in ["WARNUNG", "FEHLER"] and cid not in fixes:
                fixes[cid] = create_generic_criterion_fix(cid)
        
        # Ensure positive aspects
        if "positive_aspects" not in raw_analysis or len(raw_analysis["positive_aspects"]) == 0:
            raw_analysis["positive_aspects"] = [
                "Geschäftsidee vorhanden und beschrieben",
                "Business Plan wurde eingereicht",
                "Motivation zur Selbständigkeit erkennbar"
            ]
        
        # Ensure business name
        if "business_name" not in raw_analysis or not raw_analysis["business_name"]:
            raw_analysis["business_name"] = "Ihr Unternehmen"
        
        if metadata:
            raw_analysis["metadata"] = metadata
        
        return map_analysis_for_pdf(raw_analysis)
        
    except json.JSONDecodeError as e:
        return create_error_response(f"JSON-Parsing-Fehler: {str(e)}")
    except Exception as e:
        return create_error_response(f"Analysefehler: {str(e)}")


def create_fallback_issue() -> Dict:
    return {
        "title": "Dokumentenprüfung erforderlich",
        "description": "Der Business Plan konnte nicht vollständig analysiert werden.",
        "severity": "MITTEL",
        "fix": "Stellen Sie sicher, dass alle Abschnitte vollständig sind.",
        "copy_paste_text": "Der Business Plan wurde nach BA GZ 04 Kriterien erstellt.",
        "time_minutes": 15,
        "impact_points": 5,
        "why_it_works": "Vollständigkeit ist ein Grundkriterium für die Prüfung."
    }


def create_generic_issue(index: int) -> Dict:
    return {
        "title": f"Optimierungspotenzial #{index}",
        "description": "Weitere Verbesserungsmöglichkeiten vorhanden.",
        "severity": "MITTEL",
        "fix": "Überprüfen Sie alle Abschnitte auf Vollständigkeit.",
        "copy_paste_text": "Die Planung orientiert sich an IHK-Branchenkennzahlen.",
        "time_minutes": 10,
        "impact_points": 4,
        "why_it_works": "IHK-Referenzen erhöhen die Glaubwürdigkeit."
    }


def create_generic_criterion_fix(criterion_id: str) -> Dict:
    info = get_criterion_info(criterion_id)
    return {
        "problem": f"{info['name']} nicht ausreichend dokumentiert",
        "copy_paste_text": f"Der Bereich '{info['name']}' wurde nach IHK-Empfehlungen geplant.",
        "time_minutes": 10,
        "impact_points": info.get("max_points", 3),
        "why_it_works": "Klare Dokumentation zeigt professionelle Vorbereitung."
    }


def create_error_response(error_message: str) -> Dict:
    return {
        "score": 50,
        "potential_score": 70,
        "score_improvement": 20,
        "risk_level": "HOCH",
        "detected_industry": "Nicht erkannt",
        "business_name": "Ihr Unternehmen",
        "estimated_revenue": "N/A",
        "benchmark_revenue": "€40.000 - €60.000",
        "positive_aspects": ["Business Plan wurde eingereicht", "Gründungsmotivation erkennbar"],
        "top_issues": [create_fallback_issue(), create_generic_issue(2), create_generic_issue(3)],
        "criteria_checklist": {cid: "NICHT_GEFUNDEN" for cid in get_all_criteria_ids()},
        "criteria_fixes": {},
        "criteria_fulfilled_count": 0,
        "criteria_total_count": 27,
        "total_fix_time_minutes": 60,
        "total_fixes_count": 0,
        "personalized_summary": "Automatische Analyse fehlgeschlagen. Bitte erneut versuchen.",
        "error": error_message
    }


def get_criteria_definition() -> Dict:
    return BA_GZ_04_CRITERIA


if __name__ == "__main__":
    print("Grant Calibration V4 - SOTA Analysis Engine")
    print(f"Total criteria: {len(get_all_criteria_ids())}")