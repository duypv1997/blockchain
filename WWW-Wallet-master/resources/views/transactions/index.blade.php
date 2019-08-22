@extends('layouts.app')

@if(Auth::user()->addressEth)
  @section('content')
    <transaction :address="{{ Auth::user()->addressEth }}"></transaction>
  @endsection
@endif
