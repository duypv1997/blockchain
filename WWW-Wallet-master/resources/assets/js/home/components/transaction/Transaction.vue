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
          <td :class="getAmountClass(item)">{{ item.amount }} <span class="currency">{{ item.coin }}</span></td>
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
    width: 80%;
    margin: auto;
    table {
      width: 100%;
      thead {
        tr {
          th {
            font-size: 1rem;
            font-weight:bold;
            text-align: center;
            color: #4c4c4c;
            background: #f5f7f9;
            border-top: 1px solid #e2e7ed;
            border-bottom: 1px solid #e2e7ed;
            height: 4rem;
          }
        }
      }
      tbody {
        text-align: center;
        tr {
          td {
            font-size: 1rem;
            color: #4c4c4c;
            background: transparent;
            height: 4rem;
            border-bottom: 1px solid #eef1f4;
            text-transform: uppercase;
          }
        }
      }
      tr {
        .time {
          padding-left: 1rem;
        }
        .amount {
          padding-right: 1rem;
          text-align: right;
          font-size: 0.9rem;
        }
        td {
          &.time {
            width: 80px;
            text-align: center;
            padding-left: 1rem;
            line-height: 1.3rem;
            font-size: 0.8rem;
          }
          &.status {
            width: 60px;
            padding-left: 1rem;
            div {
              width: 45px;
              height: 33px;
              border-radius: 4px;
              margin: 0 auto;
              font-weight: bold;
              display: flex;
              align-items: center;
              font-size: 0.8rem;
              justify-content: center;
              text-align: center;
              color: $white;
              font-size: 1rem;
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
            width: 150px;
            text-align: right;
            padding-right: 1rem;
          }
          &.txid {
            font-size: 0.9rem;
            width: calc(100% - 290px);
            max-width: 100px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 0 1rem;
            text-align: center;
            text-transform: none;
            a {
              text-decoration: underline;
            }
          }
          &.red {
            color: #ef4735;
          }
          &.green {
            color:#99c57f;
          }
          .currency {
            color: #4c4c4c;
          }
        }
      }
    }
  }
</style>
