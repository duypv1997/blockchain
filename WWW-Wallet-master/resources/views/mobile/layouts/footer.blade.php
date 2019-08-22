
<footer id="footer">
  <ul>
    <li class="{{ Request::is('wallets*') ? 'text-yellow' : '' }}"><a href="{{ route('wallets.index') }}">WALLET</a></li>
    <li class="{{ Request::is('deposits*') ? 'text-yellow' : '' }}"><a href="{{ route('deposits.index') }}">DEPOSIT</a></li>
    <li class="{{ Request::is('sendings*') ? 'text-yellow' : '' }}"><a href="{{ route('sendings.index') }}">SEND</a></li>
    <li class="{{ Request::is('transactions*') ? 'text-yellow' : '' }}"><a href="{{ route('transactions.index') }}">HISTORY</a></li>
  </ul>
</footer>