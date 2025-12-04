"""
PDF Report Generator V6 für GründerAI
BALANCED DESIGN - Readable & Professional

DESIGN PRINCIPLES:
- Breathing room for readability
- Clear visual hierarchy
- Scannable content (key info stands out)
- Avoid cognitive overload
- Professional but not cramped
"""

import os
import io
import math
from datetime import datetime
from typing import Dict, List
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT


# ============================================
# COLOR PALETTE (Professional & Clean)
# ============================================
PRIMARY = colors.Color(0.14, 0.18, 0.25)           # #242E40 - Dark Slate
SUCCESS = colors.Color(0.06, 0.70, 0.50)           # #10B380 - Green
WARNING = colors.Color(0.95, 0.62, 0.14)           # #F29E24 - Amber
DANGER = colors.Color(0.90, 0.30, 0.25)            # #E64D40 - Red
INFO = colors.Color(0.25, 0.48, 0.85)              # #407AD9 - Blue

TEXT_DARK = colors.Color(0.15, 0.17, 0.20)         # #262B33
TEXT_MEDIUM = colors.Color(0.45, 0.48, 0.52)       # #737A85
TEXT_LIGHT = colors.Color(0.65, 0.68, 0.72)        # #A6ADB8

BG_PAGE = colors.Color(0.98, 0.98, 0.99)           # #FAFBFD
BG_CARD = colors.Color(0.96, 0.97, 0.98)           # #F5F7FA
BG_SUCCESS = colors.Color(0.94, 0.99, 0.96)        # #F0FCF5
BG_WARNING = colors.Color(1.0, 0.98, 0.95)         # #FFFAF2
BG_DANGER = colors.Color(1.0, 0.96, 0.95)          # #FFF5F4

BORDER = colors.Color(0.88, 0.90, 0.92)            # #E0E5EB


# ============================================
# 27 BA GZ 04 KRITERIEN
# ============================================
BA_GZ_04_CRITERIA = {
    "grundvoraussetzungen": {
        "name": "Grundvoraussetzungen",
        "criteria": [
            {"id": "G1", "name": "Solo-Selbständigkeit"},
            {"id": "G2", "name": "Einzelunternehmen/Freiberufler"},
            {"id": "G3", "name": "Keine Gesellschafter"},
            {"id": "G4", "name": "Keine Angestellten Jahr 1"},
            {"id": "G5", "name": "Haupterwerb geplant"},
            {"id": "G6", "name": "ALG-Anspruch vorhanden"},
        ]
    },
    "finanzplanung": {
        "name": "Finanzplanung",
        "criteria": [
            {"id": "F1", "name": "Realistische Umsatzprognose"},
            {"id": "F2", "name": "Kostenaufstellung"},
            {"id": "F3", "name": "Liquiditätsplanung"},
            {"id": "F4", "name": "Break-Even Analyse"},
            {"id": "F5", "name": "Kapitalbedarf"},
            {"id": "F6", "name": "Privatentnahmen"},
        ]
    },
    "marktanalyse": {
        "name": "Marktanalyse",
        "criteria": [
            {"id": "M1", "name": "Zielgruppe definiert"},
            {"id": "M2", "name": "Wettbewerbsanalyse"},
            {"id": "M3", "name": "USP formuliert"},
            {"id": "M4", "name": "Marktgröße"},
            {"id": "M5", "name": "Preiskalkulation"},
        ]
    },
    "geschaeftsmodell": {
        "name": "Geschäftsmodell",
        "criteria": [
            {"id": "B1", "name": "Leistungsbeschreibung"},
            {"id": "B2", "name": "Kundenakquise"},
            {"id": "B3", "name": "Marketing-Mix"},
            {"id": "B4", "name": "Standortwahl"},
        ]
    },
    "qualifikation": {
        "name": "Qualifikation",
        "criteria": [
            {"id": "Q1", "name": "Fachliche Eignung"},
            {"id": "Q2", "name": "Kaufmännische Kenntnisse"},
            {"id": "Q3", "name": "Branchenkontakte"},
        ]
    },
    "risikobewertung": {
        "name": "Risikobewertung",
        "criteria": [
            {"id": "R1", "name": "Risiken identifiziert"},
            {"id": "R2", "name": "Gegenmaßnahmen"},
            {"id": "R3", "name": "Plan B vorhanden"},
        ]
    }
}


def get_risk_color(risk_level: str) -> colors.Color:
    risk_map = {
        "LOW": SUCCESS, "NIEDRIG": SUCCESS,
        "MEDIUM": WARNING, "MITTEL": WARNING,
        "HIGH": WARNING, "HOCH": WARNING,
        "CRITICAL": DANGER, "KRITISCH": DANGER,
    }
    return risk_map.get(risk_level.upper(), WARNING)


def get_severity_color(severity: str) -> colors.Color:
    sev_map = {
        "CRITICAL": DANGER, "KRITISCH": DANGER,
        "HIGH": WARNING, "HOCH": WARNING,
        "MEDIUM": INFO, "MITTEL": INFO,
    }
    return sev_map.get(severity.upper(), INFO)


def get_status_info(status: str) -> tuple:
    """Returns (symbol, color)"""
    status_map = {
        "OK": ("✓", SUCCESS),
        "WARNUNG": ("!", WARNING),
        "FEHLER": ("✗", DANGER),
        "NICHT_GEFUNDEN": ("?", TEXT_LIGHT),
    }
    return status_map.get(status.upper(), ("?", TEXT_LIGHT))


def format_time(minutes: int) -> str:
    if minutes < 60:
        return f"{minutes} Min"
    hours = minutes // 60
    mins = minutes % 60
    return f"{hours}h {mins}min" if mins else f"{hours}h"


def draw_score_arc(canvas_obj, x, y, score: int, risk_level: str):
    """Draw score circle with arc"""
    radius = 38
    canvas_obj.setStrokeColor(BORDER)
    canvas_obj.setLineWidth(8)
    canvas_obj.circle(x, y, radius, fill=0, stroke=1)
    
    if score > 0:
        color = get_risk_color(risk_level)
        canvas_obj.setStrokeColor(color)
        canvas_obj.setLineWidth(8)
        canvas_obj.setLineCap(1)
        
        path = canvas_obj.beginPath()
        segments = max(int((score / 100) * 72), 1)
        for i in range(segments + 1):
            angle = math.radians(90 - (score / 100) * 360 * i / segments)
            px = x + radius * math.cos(angle)
            py = y + radius * math.sin(angle)
            if i == 0:
                path.moveTo(px, py)
            else:
                path.lineTo(px, py)
        canvas_obj.drawPath(path, stroke=1, fill=0)
    
    canvas_obj.setFillColor(TEXT_DARK)
    canvas_obj.setFont("Helvetica-Bold", 28)
    text = str(score)
    tw = canvas_obj.stringWidth(text, "Helvetica-Bold", 28)
    canvas_obj.drawString(x - tw/2, y - 8, text)


def generate_report_pdf(analysis_result: Dict, output_path: str = None) -> bytes:
    """Generate balanced, readable PDF report"""
    
    buffer = io.BytesIO()
    
    doc = SimpleDocTemplate(
        buffer, pagesize=A4,
        rightMargin=1.5*cm, leftMargin=1.5*cm,
        topMargin=2*cm, bottomMargin=1.8*cm
    )
    
    # ============================================
    # STYLES
    # ============================================
    s_title = ParagraphStyle('Title', fontSize=20, fontName='Helvetica-Bold',
        textColor=PRIMARY, spaceAfter=4*mm, alignment=TA_LEFT)
    
    s_subtitle = ParagraphStyle('Subtitle', fontSize=11, fontName='Helvetica',
        textColor=TEXT_MEDIUM, spaceAfter=6*mm)
    
    s_h1 = ParagraphStyle('H1', fontSize=16, fontName='Helvetica-Bold',
        textColor=PRIMARY, spaceAfter=4*mm, spaceBefore=8*mm)
    
    s_h2 = ParagraphStyle('H2', fontSize=13, fontName='Helvetica-Bold',
        textColor=TEXT_DARK, spaceAfter=3*mm, spaceBefore=5*mm)
    
    s_h3 = ParagraphStyle('H3', fontSize=11, fontName='Helvetica-Bold',
        textColor=TEXT_DARK, spaceAfter=2*mm, spaceBefore=4*mm)
    
    s_body = ParagraphStyle('Body', fontSize=10, fontName='Helvetica',
        textColor=TEXT_DARK, spaceAfter=3*mm, leading=14)
    
    s_small = ParagraphStyle('Small', fontSize=9, fontName='Helvetica',
        textColor=TEXT_MEDIUM, spaceAfter=2*mm, leading=12)
    
    s_tiny = ParagraphStyle('Tiny', fontSize=8, fontName='Helvetica',
        textColor=TEXT_LIGHT, leading=10)
    
    s_center = ParagraphStyle('Center', fontSize=10, fontName='Helvetica',
        textColor=TEXT_MEDIUM, alignment=TA_CENTER)
    
    # ============================================
    # DATA EXTRACTION
    # ============================================
    score = analysis_result.get("score", 0)
    potential_score = analysis_result.get("potential_score", score + 20)
    risk_level = analysis_result.get("risk_level", "MITTEL")
    business_name = analysis_result.get("business_name", "Ihr Unternehmen")
    detected_industry = analysis_result.get("detected_industry", "")
    estimated_revenue = analysis_result.get("estimated_revenue", "N/A")
    benchmark_revenue = analysis_result.get("benchmark_revenue", "N/A")
    positive_aspects = analysis_result.get("positive_aspects", [])
    personalized_summary = analysis_result.get("personalized_summary", "")
    top_issues = analysis_result.get("top_issues", [])
    criteria_checklist = analysis_result.get("criteria_checklist", {})
    criteria_fixes = analysis_result.get("criteria_fixes", {})
    total_fix_time = analysis_result.get("total_fix_time_minutes", 60)
    
    content = []
    
    # ==========================================
    # PAGE 1: EXECUTIVE SUMMARY
    # ==========================================
    
    # Header
    content.append(Paragraph(f"<b>{business_name}</b>", s_title))
    if detected_industry:
        content.append(Paragraph(f"{detected_industry}", s_subtitle))
    
    content.append(Spacer(1, 6*mm))
    
    # Score Section
    score_data = [[
        Paragraph(f"<font size='10' color='#737A85'>AKTUELLER SCORE</font>", s_center),
        Paragraph("", s_center),
        Paragraph(f"<font size='10' color='#737A85'>NACH OPTIMIERUNG</font>", s_center),
    ], [
        Paragraph(f"<font size='32'><b>{score}</b></font><font size='14' color='#A6ADB8'>/100</font>", 
                  ParagraphStyle('sc', alignment=TA_CENTER, fontSize=32)),
        Paragraph(f"<font size='24' color='#A6ADB8'>→</font>", 
                  ParagraphStyle('ar', alignment=TA_CENTER, fontSize=24)),
        Paragraph(f"<font size='32' color='#10B380'><b>{potential_score}+</b></font>", 
                  ParagraphStyle('pt', alignment=TA_CENTER, fontSize=32)),
    ]]
    
    score_table = Table(score_data, colWidths=[6*cm, 2*cm, 6*cm])
    score_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    content.append(score_table)
    
    content.append(Spacer(1, 5*mm))
    
    # Risk Badge & Quick Stats
    risk_color = get_risk_color(risk_level)
    risk_text = {"NIEDRIG": "NIEDRIGES RISIKO", "MITTEL": "MITTLERES RISIKO", 
                 "HOCH": "HOHES RISIKO", "KRITISCH": "KRITISCHES RISIKO"}.get(risk_level.upper(), risk_level)
    
    stats_data = [[
        Paragraph(f"<font color='white'><b>{risk_text}</b></font>", 
                  ParagraphStyle('risk', fontSize=10, alignment=TA_CENTER)),
        Paragraph(f"<b>{len(criteria_fixes)}</b> Kopiervorlagen", s_small),
        Paragraph(f"<b>~{format_time(total_fix_time)}</b> Aufwand", s_small),
        Paragraph(f"<b>+{potential_score - score}</b> Punkte möglich", s_small),
    ]]
    
    stats_table = Table(stats_data, colWidths=[4.5*cm, 4*cm, 4*cm, 4*cm])
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), risk_color),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    content.append(stats_table)
    
    content.append(Spacer(1, 8*mm))
    
    # Positive Aspects
    if positive_aspects:
        content.append(Paragraph("✓ Was bereits gut ist", s_h2))
        
        pos_items = []
        for asp in positive_aspects[:5]:
            pos_items.append([Paragraph(f"<font color='#10B380'>✓</font>  {asp}", s_body)])
        
        pos_table = Table(pos_items, colWidths=[16.5*cm])
        pos_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), BG_SUCCESS),
            ('BOX', (0, 0), (-1, -1), 1, SUCCESS),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ]))
        content.append(pos_table)
    
    content.append(Spacer(1, 6*mm))
    
    # Revenue Comparison
    content.append(Paragraph("Umsatz-Vergleich", s_h3))
    rev_data = [[
        Paragraph(f"<b>Dein Plan:</b> {estimated_revenue}", s_body),
        Paragraph(f"<b>IHK-Richtwert:</b> <font color='#10B380'>{benchmark_revenue}</font>", s_body),
    ]]
    rev_table = Table(rev_data, colWidths=[8*cm, 8.5*cm])
    rev_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
    ]))
    content.append(rev_table)
    
    content.append(Spacer(1, 6*mm))
    
    # Personalized Summary
    if personalized_summary:
        content.append(Paragraph("Zusammenfassung", s_h3))
        summary_table = Table([[Paragraph(personalized_summary, s_body)]], colWidths=[16.5*cm])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
            ('BOX', (0, 0), (-1, -1), 1, BORDER),
            ('TOPPADDING', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('LEFTPADDING', (0, 0), (-1, -1), 14),
            ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ]))
        content.append(summary_table)
    
    content.append(PageBreak())
    
    # ==========================================
    # PAGE 2: TOP 3 ISSUES (2 per page max)
    # ==========================================
    content.append(Paragraph("Die 3 wichtigsten Kritikpunkte", s_h1))
    content.append(Spacer(1, 4*mm))
    
    for idx, issue in enumerate(top_issues[:3], 1):
        severity = issue.get("severity", "MITTEL").upper()
        sev_color = get_severity_color(severity)
        sev_text = {"KRITISCH": "KRITISCH", "HOCH": "HOCH", "MITTEL": "MITTEL"}.get(severity, severity)
        time_min = issue.get("time_minutes", 15)
        impact_pts = issue.get("impact_points", 5)
        
        # Issue Card
        issue_content = []
        
        # Header row
        header_data = [[
            Paragraph(f"<font color='white'><b>{sev_text}</b></font>", 
                     ParagraphStyle('sev', fontSize=9, alignment=TA_CENTER)),
            Paragraph(f"<b>{idx}. {issue.get('title', '')}</b>", s_h3),
            Paragraph(f"⏱ {time_min} Min  |  <font color='#10B380'>+{impact_pts} Pkt</font>", s_small),
        ]]
        header_table = Table(header_data, colWidths=[2.2*cm, 10*cm, 4.3*cm])
        header_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, 0), sev_color),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('ALIGN', (2, 0), (2, 0), 'RIGHT'),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('LEFTPADDING', (0, 0), (0, 0), 8),
            ('RIGHTPADDING', (0, 0), (0, 0), 8),
        ]))
        issue_content.append(header_table)
        issue_content.append(Spacer(1, 3*mm))
        
        # Description
        desc = issue.get("description", "")
        if desc:
            issue_content.append(Paragraph(desc, s_body))
        
        # Solution box
        fix = issue.get("fix", "")
        if fix:
            fix_table = Table([[Paragraph(f"<font color='#10B380'><b>→ Lösung:</b></font> {fix}", s_body)]], 
                             colWidths=[15.5*cm])
            fix_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), BG_SUCCESS),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ]))
            issue_content.append(fix_table)
            issue_content.append(Spacer(1, 3*mm))
        
        # Copy-paste box
        copy_text = issue.get("copy_paste_text", "")
        if copy_text:
            cp_table = Table([
                [Paragraph("<b>📋 Kopiervorlage:</b>", s_small)],
                [Paragraph(f"<i>\"{copy_text}\"</i>", s_body)],
            ], colWidths=[15.5*cm])
            cp_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), BG_WARNING),
                ('BOX', (0, 0), (-1, -1), 1.5, WARNING),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('LEFTPADDING', (0, 0), (-1, -1), 12),
                ('RIGHTPADDING', (0, 0), (-1, -1), 12),
            ]))
            issue_content.append(cp_table)
        
        # Why it works
        why_works = issue.get("why_it_works", "")
        if why_works:
            issue_content.append(Spacer(1, 2*mm))
            issue_content.append(Paragraph(f"<font color='#737A85'>💡 {why_works}</font>", s_small))
        
        # Wrap in card
        card_table = Table([[issue_content]], colWidths=[16.5*cm])
        card_table.setStyle(TableStyle([
            ('BOX', (0, 0), (-1, -1), 1, BORDER),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ]))
        
        content.append(KeepTogether(card_table))
        content.append(Spacer(1, 6*mm))
    
    content.append(PageBreak())
    
    # ==========================================
    # PAGE 3: CHECKLIST
    # ==========================================
    content.append(Paragraph("BA GZ 04 Prüfprotokoll", s_h1))
    content.append(Paragraph("27 Kriterien nach Bundesagentur für Arbeit", s_small))
    content.append(Spacer(1, 4*mm))
    
    # Stats
    stats = {"OK": 0, "WARNUNG": 0, "FEHLER": 0, "NICHT_GEFUNDEN": 0}
    for status in criteria_checklist.values():
        key = status.upper()
        if key in stats:
            stats[key] += 1
    
    legend_data = [[
        Paragraph(f"<font color='#10B380'><b>✓</b></font> {stats['OK']} Erfüllt", s_small),
        Paragraph(f"<font color='#F29E24'><b>!</b></font> {stats['WARNUNG']} Warnung", s_small),
        Paragraph(f"<font color='#E64D40'><b>✗</b></font> {stats['FEHLER']} Fehler", s_small),
        Paragraph(f"<font color='#A6ADB8'><b>?</b></font> {stats['NICHT_GEFUNDEN']} Offen", s_small),
        Paragraph(f"<b>📋 {len(criteria_fixes)}</b> Vorlagen", s_small),
    ]]
    legend_table = Table(legend_data, colWidths=[3.2*cm, 3.2*cm, 3.2*cm, 3.2*cm, 3.2*cm])
    legend_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    content.append(legend_table)
    content.append(Spacer(1, 5*mm))
    
    # Checklist by category
    for cat_key, category in BA_GZ_04_CRITERIA.items():
        content.append(Paragraph(f"<b>{category['name']}</b>", s_h3))
        
        rows = []
        for c in category["criteria"]:
            cid = c["id"]
            status = criteria_checklist.get(cid, "NICHT_GEFUNDEN")
            symbol, color = get_status_info(status)
            has_fix = "📋" if cid in criteria_fixes else ""
            
            rows.append([
                Paragraph(f"<font color='#{color.hexval()[2:]}'><b>{symbol}</b></font>", 
                         ParagraphStyle('sym', fontSize=12, alignment=TA_CENTER)),
                Paragraph(f"<b>{cid}</b>", ParagraphStyle('id', fontSize=9, textColor=TEXT_MEDIUM)),
                Paragraph(c["name"], s_body),
                Paragraph(has_fix, ParagraphStyle('fx', fontSize=10, alignment=TA_CENTER)),
            ])
        
        check_table = Table(rows, colWidths=[1.2*cm, 1.2*cm, 12.5*cm, 1.5*cm])
        check_table.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
            ('BACKGROUND', (0, 0), (-1, -1), colors.white),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ]))
        content.append(check_table)
        content.append(Spacer(1, 4*mm))
    
    content.append(PageBreak())
    
    # ==========================================
    # PAGE 4+: ALL COPY-PASTE TEMPLATES
    # ==========================================
    content.append(Paragraph(f"Alle {len(criteria_fixes)} Kopiervorlagen", s_h1))
    content.append(Paragraph("Fertige Textbausteine für deinen Business Plan", s_small))
    content.append(Spacer(1, 5*mm))
    
    for cat_key, category in BA_GZ_04_CRITERIA.items():
        cat_fixes = [(c["id"], c["name"], criteria_fixes[c["id"]]) 
                     for c in category["criteria"] if c["id"] in criteria_fixes]
        
        if cat_fixes:
            content.append(Paragraph(f"<b>{category['name']}</b>", s_h2))
            
            for cid, cname, fix_data in cat_fixes:
                status = criteria_checklist.get(cid, "WARNUNG")
                symbol, color = get_status_info(status)
                time_min = fix_data.get("time_minutes", 10)
                impact_pts = fix_data.get("impact_points", 3)
                problem = fix_data.get("problem", "")
                copy_text = fix_data.get("copy_paste_text", "")
                why_works = fix_data.get("why_it_works", "")
                
                # Fix header
                header = Table([[
                    Paragraph(f"<font color='#{color.hexval()[2:]}'><b>{symbol}</b></font>", 
                             ParagraphStyle('s', fontSize=11, alignment=TA_CENTER)),
                    Paragraph(f"<b>{cid}: {cname}</b>", s_h3),
                    Paragraph(f"⏱ {time_min} Min | +{impact_pts} Pkt", s_small),
                ]], colWidths=[1*cm, 11.5*cm, 4*cm])
                header.setStyle(TableStyle([
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('ALIGN', (2, 0), (2, 0), 'RIGHT'),
                    ('BACKGROUND', (0, 0), (-1, -1), BG_CARD),
                    ('TOPPADDING', (0, 0), (-1, -1), 6),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ]))
                content.append(header)
                
                if problem:
                    content.append(Paragraph(f"<i>Problem: {problem}</i>", s_small))
                
                # Copy-paste text
                if copy_text:
                    cp_box = Table([[Paragraph(f"\"{copy_text}\"", s_body)]], colWidths=[16*cm])
                    cp_box.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, -1), BG_WARNING),
                        ('BOX', (0, 0), (-1, -1), 1, WARNING),
                        ('TOPPADDING', (0, 0), (-1, -1), 10),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
                        ('LEFTPADDING', (0, 0), (-1, -1), 12),
                        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
                    ]))
                    content.append(cp_box)
                
                if why_works:
                    content.append(Paragraph(f"<font color='#737A85'>💡 {why_works}</font>", s_tiny))
                
                content.append(Spacer(1, 5*mm))
    
    # ==========================================
    # FINAL PAGE: NEXT STEPS
    # ==========================================
    content.append(Spacer(1, 8*mm))
    content.append(Paragraph("Nächste Schritte", s_h2))
    
    steps = [
        f"Kopiere die {len(criteria_fixes)} Vorlagen in deinen Business Plan",
        "Überarbeite zuerst die KRITISCH markierten Punkte",
        "Prüfe die Finanzplanung mit IHK-Richtwerten",
        "Lasse den Plan von einer fachkundigen Stelle prüfen (IHK, HWK)",
        "Reiche den überarbeiteten Plan bei der Arbeitsagentur ein"
    ]
    
    for i, step in enumerate(steps, 1):
        content.append(Paragraph(f"<b>{i}.</b>  {step}", s_body))
    
    content.append(Spacer(1, 6*mm))
    
    # Resources
    content.append(Paragraph("<b>Hilfreiche Ressourcen</b>", s_h3))
    content.append(Paragraph("• <b>IHK Existenzgründung:</b> ihk.de/existenzgruendung", s_small))
    content.append(Paragraph("• <b>Arbeitsagentur:</b> arbeitsagentur.de/gruendungszuschuss", s_small))
    content.append(Paragraph("• <b>DEHOGA Branchenkennzahlen:</b> dehoga-bundesverband.de", s_small))
    
    content.append(Spacer(1, 10*mm))
    
    # Footer
    footer = Table([[
        Paragraph("<b>ZuschussCheck</b> by PrincipalAI", s_body),
        Paragraph(f"Analyse für {business_name}", s_small),
        Paragraph("www.principal.de", s_body),
    ]], colWidths=[5*cm, 7*cm, 4.5*cm])
    footer.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, 0), 'LEFT'),
        ('ALIGN', (1, 0), (1, 0), 'CENTER'),
        ('ALIGN', (2, 0), (2, 0), 'RIGHT'),
        ('LINEABOVE', (0, 0), (-1, 0), 1, BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
    ]))
    content.append(footer)
    
    # Build PDF
    def add_page_number(canvas_obj, doc_obj):
        canvas_obj.setFont("Helvetica", 8)
        canvas_obj.setFillColor(TEXT_LIGHT)
        canvas_obj.drawString(1.5*cm, 1*cm, f"Score: {score}/100")
        canvas_obj.drawRightString(A4[0] - 1.5*cm, 1*cm, f"Seite {doc_obj.page}")
    
    doc.build(content, onFirstPage=add_page_number, onLaterPages=add_page_number)
    
    pdf_bytes = buffer.getvalue()
    buffer.close()
    
    if output_path:
        with open(output_path, 'wb') as f:
            f.write(pdf_bytes)
    
    return pdf_bytes