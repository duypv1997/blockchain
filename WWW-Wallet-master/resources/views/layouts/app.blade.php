<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ mix('build/js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="{{ asset('/favicon.ico') }}" type="image/x-icon">

    <!-- Styles -->
    <link href="{{ mix('build/css/app.css') }}" rel="stylesheet">
  </head>
  <body>
    <div id="app">
      @include('layouts.header')
      <div class="wrap">
        <main>
          <div class="justify-content-center">
            <div class="icon-login"></div>
            <p class="biko-login">WWW</p>
            <p class="title-login">COIN WALLET</p>
          </div>
          @yield('content')
          @if(!Auth::guest() && !Auth::user()->addressEth)
            @include('layouts.no_account')
          @endif
        </main>
        <modal v-show="displayModal" @close="modalOff">
          <keep-alive>
            <component v-bind:is="currentModal" :modal-data="modalData"></component>
          </keep-alive>
        </modal>
      </div>
    </div>
  </body>
</html>
