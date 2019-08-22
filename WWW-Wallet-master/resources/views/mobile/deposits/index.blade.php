@extends('layouts.app')

@if(Auth::user()->addressEth)
  @section('content')
    <deposit :address="{{ Auth::user()->addressEth }}" email="{{ Auth::user()->email }}"></deposit>
  @endsection
@endif