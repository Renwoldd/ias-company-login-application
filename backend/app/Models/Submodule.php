<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submodule extends Model
{
    protected $fillable = ['module_id', 'name', 'code', 'route'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_submodule')
                    ->withTimestamps()
                    ->withPivot('granted_at', 'created_by');
    }
}
