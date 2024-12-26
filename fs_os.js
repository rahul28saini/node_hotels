var fs = require("fs") // FS command is used to create a file and write the content in file
var os = require("os") // OS command is used to fetch the system information
var user = os.userInfo()
console.log(user)

fs.appendFile(
    'geeting.txt',
    '\nHi ' + user.username + '!'+'\n We are happy to please you, organization has decided to promote you as Sr. software engineer.',
    ()=>{
        console.log('File is created')
    }
)