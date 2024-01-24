<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
	{
		$students = Student::all();

		if ($students) {
			$response = [
				'message' => 'Menampilkan Data Student',
				'data' => $students,
			];
			return response()->json($response, 200);
		} else {
			$response = [
				'message' => 'Data student not found'
			];
			return response()->json($response, 400);
		}
	}

	public function show($id){
		$student = Student::find($id);

		if($student){
			$response = [
				'message' => 'detail student',
				'data' => $student,
			];

			return response()->json($response, 200);
		}
		else{
			$response = [
				'message' => 'Data student not found'
			];
			return response()->json($response, 404);
		}

	}

	public function store(Request $request)
    {
        // menangkap data request
        // $input = $request->all();

        // validasi data
        $validateData = $request->validate([
            'nama' => 'required',
            'nim' => 'numeric|required',
            'email' => 'email|required',
            'jurusan' => 'required'
        ]);

        $student = Student::create($validateData);


        $data = [
            'message' => 'Student is created succesfully',
            'data' => $student,
        ];

        // mengembalikan data (json) dan kode 201
        return response()->json($data, 201);
    }

	public function update(Request $request, $id)
    {
		$student = Student::find($id);
		if($student){
			
			$student->update($request->all());
			
			$response = [
				'message' => 'Update student success',
				'data' => $student,
			];
			return response()->json($response, 200);
		}
		else{
			$response = [
				'message' => 'Data student not found'
			];
			return response()->json($response, 404);
		}
		

    }

	public function destroy($id){
		$student = Student::find($id);
		if($student){
			$student->delete();
			$response = [
				'message' => 'Delete student success'
			];
			return response()->json($response, 200);
		}
		else{
			$response = [
				'message' => 'Data student not found'
			];
			return response()->json($response, 404);
		}
	}
}