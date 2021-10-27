const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports = async function(name, options) {
  // 执行创建命令
  // 当前命令行选择的目录
  const cwd = process.cwd()
  // 需要创建的目录地址
  const targetDir = path.join(cwd, name)
  console.log(targetDir)
  // 目录检查
  if (fs.existsSync(targetDir)) {
    // 强制创建，直接删除已存在的目录
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // 询问是否覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists, pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return
      } else if (action === 'overwrite') {
        console.log('\r\nRemoving...')
        await fs.remove(targetDir)
      }
    }
  }
}
