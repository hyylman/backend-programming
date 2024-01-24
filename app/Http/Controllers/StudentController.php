<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index() {
        $students = (new Student())->getStudents();

        $data = [
            'message' => 'List All Students',
            'data' => $students
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'nama' => 'required|string',
            'nim' => 'required|string|unique:students',
            'email' => 'required|email|unique:students',
            'jurusan' => 'required|string',
        ]);

        $student = Student::create($validatedData);

        $data = [
            'message' => 'Student Created',
            'data' => $student
        ];

        return response()->json($data, 201);
    }

    public function update(Request $request, string $id) {
        $validatedData = $request->validate([
            'nama' => 'required|string',
            'nim' => 'required|string|unique:students,nim,' . $id,
            'email' => 'required|email|unique:students,email,' . $id,
            'jurusan' => 'required|string',
        ]);

        $student = Student::find($id);
        
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->update($validatedData);

        $data = [
            'message' => 'Student Updated',
            'data' => $student
        ];

        return response()->json($data, 200);
    }

    public function destroy(string $id) {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->delete();

        $data = [
            'message' => 'Student with ID: ' . $id . ' successfully deleted',
        ];

        return response()->json($data, 200);
    }
}
