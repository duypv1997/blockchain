@extends('layouts.app')

@section('content')
  <div id="auth" class="container">
    <div class="row justify-content-center">
      <form method="POST" action="{{ route('login') }}">
        @csrf

        <div class="form-group borderBottom">
          <label for="email" class="label">{{ __('ID') }}</label>

          <div class="input">
            <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

            @if ($errors->has('email'))
              <span class="invalid-feedback">
                  <strong>{{ $errors->first('email') }}</strong>
              </span>
            @endif
          </div>
        </div>

        <div class="form-group borderBottom">
          <label for="password" class="label">{{ __('PASSWORD') }}</label>

          <div class="input">
            <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

            @if ($errors->has('password'))
              <span class="invalid-feedback">
                <strong>{{ $errors->first('password') }}</strong>
              </span>
            @endif
          </div>
        </div>

        <div class="form-group group-button-login">
          <button type="submit" class="btn btn-login">
              {{ __('LOGIN') }}
          </button>
          <a class="btn btn-signup" href="{{ route('register') }}">
              {{ __('SIGNUP') }}
          </a>
        </div>
      </form>
    </div>
  </div>
@endsection
