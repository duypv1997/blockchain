@extends('layouts.app')

@if(Auth::user()->addressEth)
  @section('content')
    <div class="container ep-key">
      <h4 class="email">{{ Auth::user()->email }}</h4>
      <export-private-key :address="{{ Auth::user()->addressEth }}"></export-private-key>
    </div>
  @endsection
@endif
