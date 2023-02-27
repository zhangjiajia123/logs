import { Button, Upload, Table  } from 'ant-design-vue';
const compoments = [Button, Upload, Table]
export function registerGlobal(app) {
  compoments.forEach(component => {
    app.use(component)
  })
}
