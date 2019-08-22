import Vue from 'vue';
import '../../common/bootstrap';
import VueBroadcast from '../../common/VueBroadcast';
import '../common-components';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import pagination from "vuejs-uib-pagination";

Vue.use(pagination);
Vue.use(VueClipboard);
Vue.use(Toasted);
Vue.use(VueBroadcast);

window.app = new Vue({
    el: '#app',
    data() {
      return {
        displayModal: false,
        modalData: null,
        currentModal: null,
      };
    },
    created() {
      this.$on('open-modal', this.openModal);
      this.$on('close-modal', this.modalOff);
    },
    methods: {
      modalOff() {
        this.displayModal = false;
        this.currentModal = null;
      },
      openModal(component, modalData = null) {
        this.currentModal = component;
        this.modalData = modalData;
        this.displayModal = true;
      },
    },
});
