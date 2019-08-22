<div class="container">
  <div class="no-account">
    <div class="title">
      <h4 class="email">{{ Auth::user()->email }}</h4>
      <div class="clearfix"></div>
      <h4>NO ACCOUNT</h4>
    </div>
    <getting-address :user-id="{{ Auth::id() }}"></getting-address>
  </div>
</div>
