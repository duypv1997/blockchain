
<header id="header">
  <div class="icon"></div><p class="biko-header">WWW coin</p>
  <div class="auth">
    <div class="width-content options">
      <ul>
        <li class="{{ Request::is('wallets*') ? 'text-yellow' : '' }}"><a href="{{ route('wallets.index') }}">WALLET</a></li>
        <li class="{{ Request::is('deposits*') ? 'text-yellow' : '' }}"><a href="{{ route('deposits.index') }}">DEPOSIT</a></li>
        <li class="{{ Request::is('sendings*') ? 'text-yellow' : '' }}"><a href="{{ route('sendings.index') }}">SEND</a></li>
        <li class="{{ Request::is('transactions*') ? 'text-yellow' : '' }} border-right"><a href="{{ route('transactions.index') }}">HISTORY</a></li>
      </ul>
    </div>
  </div>
  @if (Auth::user())
    <div class="dropdown">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ Auth::user()->email }}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="{{ route('exportPrivateKey') }}">Export private key</a>
        <a class="dropdown-item" href="javascript:void(0)" @click="$refs.logoutForm.submit()">Logout</a>
      </div>
    </div>
    <form ref="logoutForm" action="{{ route('logout') }}" method="POST" style="display: none;">
      @csrf
    </form>
  @endif
</header>
<div class="clearfix"></div>