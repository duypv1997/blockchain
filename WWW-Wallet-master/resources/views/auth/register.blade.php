@extends('layouts.app')

@section('content')
<div id="auth" class="container">
  <div class="justify-content-center">
    <register>
      <template scope="getCode">
        <form method="POST" action="{{ route('register') }}">
          @csrf

          <div class="form-group borderBottom">
            <label for="email" class="label">{{ __('ID') }}</label>

            <div class="input">
              <input id="email" type="email" @change="getCode.updateEmail" v-model="getCode.email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>
              @if ($errors->has('email'))
                <span class="invalid-feedback">
                  <strong>{{ $errors->first('email') }}</strong>
                </span>
              @endif
            </div>
            <div>
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

          <div class="form-group borderBottom">
            <label for="password-confirm" class="label confirm">{{ __('CONFIRM PASSWORD') }}</label>

            <div class="input">
              <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
            </div>
          </div>

          <div class="form-group borderBottom">
            <label for="country" class="label">{{ __('COUNTRY') }}</label>

            <div class="select-country">
              <select name="country" v-model="getCode.country" @change="getCode.updateCountry">
                <option v-for="country in getCode.countries" :value="country.name">@{{ country.name }}</option>
              </select>
            </div>

            @if ($errors->has('country'))
              <span class="invalid-feedback">
                <strong>{{ $errors->first('country') }}</strong>
              </span>
            @endif
          </div>

          <div class="form-group borderBottom">
            <label for="phone_number" class="label">{{ __('PHONE#') }}</label>

            <div class="input">
              <input id="phone_number" type="text" class="form-control{{ $errors->has('phone_number') ? ' is-invalid' : '' }}" name="phone_number" value="{{ old('phone_number') }}" required>

              @if ($errors->has('phone_number'))
                <span class="invalid-feedback">
                  <strong>{{ $errors->first('phone_number') }}</strong>
                </span>
              @endif
            </div>
          </div>

          <div class="form-group borderBottom">
              <div class="label">
                <button type="button" class="btn btn-getcode" @click="getCode.getCode">GET CODE</button>
              </div>

              <div class="input">
                <input id="certificate_number" type="text" class="form-control{{ $errors->has('certificate_number') ? ' is-invalid' : '' }}" name="certificate_number" required>
                @if ($errors->has('certificate_number'))
                  <span class="invalid-feedback">
                    <strong>{{ $errors->first('certificate_number') }}</strong>
                  </span>
                @endif
              </div>
          </div>
          <input type="hidden" name="hash" :value="getCode.hash">

          <div class="form-group group-button-register">
            <a class="btn btn-login btn-gray" href="{{ route('login') }}">
              {{ __('LOGIN') }}
            </a>
            <button type="submit" class="btn btn-signup">
              {{ __('SIGNUP') }}
            </button>
          </div>
        </form>
      </template>
    </register>
  </div>
</div>
@endsection

