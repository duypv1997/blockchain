<template>
  <div class="transaction">
    <table>
      <thead>
        <tr>
          <th class="time">TIME</th>
          <th class="status"></th>
          <th class="txid">TXID</th>
          <th class="amount">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data">
          <td class="time">
            <span class="day">{{ getDay(item) }}</span>
            <span class="hour">{{ getHour(item) }}</span>
          </td>
          <td class="status"><div :class="getInOut(item)">{{ getInOut(item) }}</div></td>
          <td class="txid"><a target="_blank" :href="'https://etherscan.io/tx/' + item.txid">{{ item.txid }}</a></td>
          <td class="amount">{{ item.amount }} {{ item.coin }}</td>
        </tr>
      </tbody>
    </table>
    <uib-pagination v-model="pagination" :items-per-page="perPage" :max-size="5" :total-items="total"  @change="gotoPage()"></uib-pagination>
  </div>
</template>
<script>
  import TransactionMixin from '../../../common/components/TransactionMixin';

  export default {
    mixins: [TransactionMixin],
  };
</script>
<style lang="scss" scoped>
  @import '../../../../sass/variables';

  .transaction {
    font-family: $font-family-open-sans;
    width: 100%;
    table {
      width: 100%;
      thead {
        tr {
          th {
            font-size: 1rem;
            font-weight:bold;
            text-align: center;
            color: $white;
            background: #494949;
            height: 4rem;
          }
        }
      }
      tbody {
        text-align: center;
        tr {
          td {
            font-size: 1rem;
            color: $white;
            background: transparent;
            height: 4rem;
            border-bottom: 1px solid #9f9f9f;
            text-transform: uppercase;
          }
        }
      }
      tr {
        td {
          &.time {
            width: 60px;
          }
          &.status {
            width: 40px;
            div {
              width: 40px;
              height: 30px;
              border-radius: 4px;
              margin: 0 auto;
              font-weight: bold;
              display: flex;
              align-items: center;
              font-size: 0.8rem;
              justify-content: center;
              &.in {
                background: #8BD05B;
                border: 1px solid #8BD05B;
              }
              &.out {
                background: #F17D3F;
                border: 1px solid #F17D3F;
              }
            }
          }
          &.amount {
            width: 110px;
          }
          &.txid {
            font-size: 0.8rem;
            width: calc(100% - 210px);
            max-width: 100px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 0 5px;
          }
        }
      }
    }
  }
</style>
