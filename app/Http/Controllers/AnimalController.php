<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnimalController extends Controller
{
    protected $animal = [
        ['id' => 1, 'nama' => 'Kucing'],
        ['id' => 2, 'nama' => 'Ayam'],
        ['id' => 3, 'nama' => 'Ikan'],
    ];

    public function index()
    {
        $animalNames = array_column($this->animal, 'nama');
        return implode(", ", $animalNames);
    }

    public function store(Request $request)
    {
        foreach ($this->animal as $anml) {
            if ($anml['id'] == $request->id) {
                return 'Gunakan id yang lain';
            }
        }

        $newAnimal = [
            'id' => $request->id,
            'nama' => $request->nama,
        ];

        array_push($this->animal, $newAnimal);

        return "Menambahkan data animals - Nama hewan: $request->nama";
    }

    public function update(Request $request, $id)
    {
        $animal = $this->animal[$id] ?? null;

        if ($animal) {
            $animal['nama'] = $request->nama;
            $this->animal[$id] = $animal;

            return "Mengubah data animal id $id - Nama hewan: $request->nama";
        }

        return "Data animal id $id tidak ditemukan";
    }

    public function destroy($id)
    {
        unset($this->animal[$id]);

        return "Menghapus data animal id $id";
    }
}
