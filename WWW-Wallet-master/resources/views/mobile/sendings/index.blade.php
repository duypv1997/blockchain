@extends('layouts.app')

@if(Auth::user()->addressEth)
  @section('content')
    <sending :address="{{ Auth::user()->addressEth }}" :user-id="{{ Auth::id() }}"></sending>
  @endsection
@endif
