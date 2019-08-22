import Vue from 'vue';

Vue.component('deposit', require('./components/deposit/Deposit'));
Vue.component('getting-address', require('./components/address/GettingAddress.vue'));
Vue.component('eth-address', require('./components/address/Address.vue'));
Vue.component('sending', require('./components/sending/Sending.vue'));
Vue.component('transaction', require('./components/transaction/Transaction.vue'));
Vue.component('register', require('./components/register/Register.vue'));
Vue.component('export-private-key', require('./components/exportPrivateKey/ExportPrivateKey.vue'));
Vue.component('modal', require('../common/components/Modal.vue'));
