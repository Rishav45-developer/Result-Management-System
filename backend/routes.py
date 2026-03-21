from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from database import collection
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
import os

router = APIRouter()


@router.get("/student/{student_id}")
def get_student(student_id: str):
    student = collection.find_one({"student_id": student_id})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student["_id"] = str(student["_id"])
    return student


@router.get("/student/{student_id}/pdf")
def download_pdf(student_id: str):
    student = collection.find_one({"student_id": student_id})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    file_name = f"{student_id}_result.pdf"
    doc = SimpleDocTemplate(file_name, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("<b>Academic Result</b>", styles["Title"]))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph(f"Name: {student['name']}", styles["Normal"]))
    elements.append(Paragraph(f"Student ID: {student['student_id']}", styles["Normal"]))
    elements.append(Spacer(1, 10))

    elements.append(Paragraph(f"Maths: {student['maths']}", styles["Normal"]))
    elements.append(Paragraph(f"Physics: {student['physics']}", styles["Normal"]))
    elements.append(Paragraph(f"Biology: {student['biology']}", styles["Normal"]))

    doc.build(elements)

    return FileResponse(file_name, media_type='application/pdf', filename=file_name)