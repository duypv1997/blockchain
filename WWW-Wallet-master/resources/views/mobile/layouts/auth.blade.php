<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <title>{{ config('app.name', 'Biko') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('/favicon.ico') }}" type="image/x-icon">

    <script src="{{ mix('build/js/mobile.js') }}" defer></script>
    <!-- Styles -->
    <link href="{{ mix('build/css/auth.css') }}" rel="stylesheet">
  </head>
  <body>
    <div id="app">
      <main class="content">
        @yield('content')
      </main>
      <modal v-show="displayModal" @close="modalOff">
        <keep-alive>
          <component v-bind:is="currentModal" :modal-data="modalData"></component>
        </keep-alive>
      </modal>
    </div>
  </body>
</html>
