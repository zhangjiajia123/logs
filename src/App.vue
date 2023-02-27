<template>
  <div>
    <div id="uploadLists">
      <div class="list">
        <div class="list_upload">
          <a-upload
          list-type="picture"
          :accept="accept"
          :max-count="count"
          action=""
          id="upload"
          :preview-file="previewFile1"
          >
            <a-button>
              选择文件
            </a-button>
          </a-upload>
        </div>
        <div class="resultBox">
          <div class="result">
            <a-table :columns="columns" id="table1" :data-source="data" :pagination="false" :loading="loading" :scroll="{ y: 740 }">
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'dateTime'">
                  <a :class="update === setDate(record.dateTime) ? 'addRed' : ''" @click="getDateTime(record, index, 1)">{{ record.dateTime }}</a>
                </template>
                <template v-if="column.dataIndex === 'value'">
                  <span :class="update === setDate(record.dateTime) ? 'addRed' : ''">{{ record.value }}</span>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list_upload">
          <a-upload
          list-type="picture"
          :accept="accept"
          :max-count="count"
          action=""
          :preview-file="previewFile2"
          >
            <a-button>
              选择文件
            </a-button>
          </a-upload>
        </div>
        <div class="resultBox">
          <div class="result">
            <a-table :columns="columns" id="table2" :data-source="data2" :pagination="false" :loading="loading2" :scroll="{ y: 740 }">
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'dateTime'">
                  <a :class="update === setDate(record.dateTime) ? 'addRed' : ''" @click="getDateTime(record, index, 2)">{{ record.dateTime }}</a>
                </template>
                <template v-if="column.dataIndex === 'value'">
                  <span :class="update === setDate(record.dateTime) ? 'addRed' : ''">{{ record.value }}</span>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list_upload">
          <a-upload
          list-type="picture"
          :accept="accept"
          :max-count="count"
          action=""
          :preview-file="previewFile3"
          >
            <a-button>
              选择文件
            </a-button>
        </a-upload>
        </div>
        <div class="resultBox">
          <div class="result">
            <a-table :columns="columns" id="table3" :data-source="data3" :pagination="false" :loading="loading3" :scroll="{ y: 740 }">
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'dateTime'">
                  <a :class="update === setDate(record.dateTime) ? 'addRed' : ''" @click="getDateTime(record, index, 3)">{{ record.dateTime }}</a>
                </template>
                <template v-if="column.dataIndex === 'value'">
                  <span :class="update === setDate(record.dateTime) ? 'addRed' : ''">{{ record.value }}</span>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed  } from 'vue'
const accept = ref('.log,.slg')
const count = ref(3)
const columns = ref([{
  title: '日期',
  dataIndex: 'dateTime',
}, {
  title: '内容',
  dataIndex: 'value',
}])
const data = ref([])
const loading = ref(false)
const data2 = ref([])
const loading2 = ref(false)
const data3 = ref([])
const loading3 = ref(false)
const clickDate = ref('')
const regex = /(?=^([0-9]{4}(-|\/)(0[0-9]|1[0-2])(-|\/)(0[1-9]|[12][0-9]|3[0-1])( |-)([01][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]))/gm
const regex2 = /(\d{4})(?:-|\/)(0[0-9]|1[0-2])(?:-|\/)(0[1-9]|[12][0-9]|3[0-1])(?:-| )([01][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])/
const update = computed(() => {
  return clickDate.value
})
const setDate = (date) => {
  const arr = date ? date.match(regex2) : ''
  return `${arr[1]}-${arr[2]}-${arr[3]} ${arr[4]}:${arr[5]}:${arr[6]}` 
}
const previewFile1 = async file => {
  loading.value = true
  var reader = new FileReader();
  const type = file.name.split('.')[1]
  reader.readAsText(file);
  reader.onload = function (f) {
    const str = this.result.replace(regex, '<br>')
    const arr = str.split('<br>')
    const obj = []
    arr.forEach(list => {
      if(list) {
        let aa = list.split(/[|,]/)
        obj.push({
          dateTime: aa[0].trim(),
          value: aa[1].replace(/\n|(<br>)/, '').trim()
        })
      }
    });
    nextTick(() => {
      data.value = obj
      loading.value = false
    })
  }
};
const previewFile2 = async file => {
  loading2.value = true
  var reader = new FileReader();
  const type = file.name.split('.')[1]
  reader.readAsText(file);
  reader.onload = function (f) {
    const str = this.result.replace(regex, '<br>')
    let arr = str.split('<br>')
    const obj = []
    arr.forEach(list => {
      if(list) {
        let aa = []
        if(type === 'log') {
          aa = list.split('|')
        }
        if(type === 'slg') {
          aa = list.split(',')
        }
        obj.push({
          dateTime: aa[0].trim(),
          value: aa[1].replace(/\n/, '').trim()
        })
      }
    });
    nextTick(() => {
      data2.value = obj
      loading2.value = false
    })
  }
};
const previewFile3 = async file => {
  loading3.value = true
  var reader = new FileReader();
  const type = file.name.split('.')[1]
  reader.readAsText(file);
  reader.onload = function (f) {
    const str = this.result.replace(regex, '<br>')
    let arr = str.split('<br>')
    const obj = []
    arr.forEach(list => {
      if(list) {
        let aa = []
        if(type === 'log') {
          aa = list.split('|')
        }
        if(type === 'slg') {
          aa = list.split(',')
        }
        obj.push({
          dateTime: aa[0].trim(),
          value: aa[1].replace(/\n/, '').trim()
        })
      }
    });
    nextTick(() => {
      data3.value = obj
      loading3.value = false
    })
  }
};
// 当前点击时间表格数据定位
const clickTable = (table, index) => {
  const rowHeight = table.getElementsByClassName("ant-table-body")[0].getElementsByClassName('ant-table-row')[index].offsetTop - 100
  const scroll = table.getElementsByClassName("ant-table-body")[0]
  scroll.scrollTop = rowHeight
}
// 其他表格数据定位
const otherTable = (table, data, date) => {
  if(!data.value.length) {
    return
  }  
  const scroll = table.getElementsByClassName("ant-table-body")[0]
  var i = 0
  data.value.some((item, index) => {
    if(item.dateTime === date.dateTime) {
      i = index
      return true
    }
  })
  const rowHeight = table.getElementsByClassName("ant-table-body")[0].getElementsByClassName('ant-table-row')[i].offsetTop - 100
  scroll.scrollTop = rowHeight
}
// 点击时间事件
const getDateTime = (date, index, clickIndex) => {
  const arr = date.dateTime.match(regex2)
  clickDate.value = `${arr[1]}-${arr[2]}-${arr[3]} ${arr[4]}:${arr[5]}:${arr[6]}`
  const tab1 = document.getElementById('table1')
  const tab2 = document.getElementById('table2')
  const tab3 = document.getElementById('table3')
  if(clickIndex == 1) {
    clickTable(tab1, index)
    otherTable(tab2, data2, date)
    otherTable(tab3, data3, date)
  }
  if(clickIndex == 2) {
    clickTable(tab2, index)
    otherTable(tab1, data, date)
    otherTable(tab3, data3, date)
  }
  if(clickIndex == 3) {
    clickTable(tab3, index)
    otherTable(tab1, data, date)
    otherTable(tab2, data2, date)
  }
}
</script>
<style>
.ant-upload-list{
  display: none !important;
}
</style>
<style scoped lang='less'>
#uploadLists {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  .list {
    width: 33%;
    .list_upload {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.resultBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .result {
    width: 100%;
    overflow-y: auto;
    .addRed {
      color: red;
    }
  }
}
</style>
