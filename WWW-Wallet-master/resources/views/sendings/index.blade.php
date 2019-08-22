@extends('layouts.app')

@if(Auth::user()->addressEth)
  @section('content')
    <sending :address="{{ Auth::user()->addressEth }}"></sending>
  @endsection
@endif
