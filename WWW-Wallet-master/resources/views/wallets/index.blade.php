@extends('layouts.app')
@if(Auth::user()->addressEth)
  @section('content')
    <eth-address :address="{{ Auth::user()->addressEth }}" email="{{ Auth::user()->email }}"></eth-address>
  @endsection
@endif
