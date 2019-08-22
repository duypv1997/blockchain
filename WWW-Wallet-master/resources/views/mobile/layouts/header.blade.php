
<header id="header">
  <div class="icon-header"></div>
  <p class="biko-header">www coin</p>
  <p class="title-header">{{ $title ?? 'WALLET' }}</p>
  <button class="btn-header" data-toggle="dropdown">
    <div class="dot top"></div>
    <div class="dot middle"></div>
    <div class="dot bottom"></div>
  </button>
  <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
    <li class="dropdown-item"><a href="javascript:void(0)">{{ Auth::user()->email }}</a></li>
    <li class="dropdown-item"><a href="{{ route('exportPrivateKey') }}">Export private key</a></li>
    <li class="dropdown-item" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
       <a href="#">logout</a>
     </li>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
      @csrf
    </form>
  </ul>
</header>
<div class="clearfix"></div>