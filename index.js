const mongoose = require('mongoose');
const { mongo } = require('./config.js');
const urlDB = mongo.URI;
const GroupUser = require('./schemas/group-user')
const Group = require('./schemas/group')
const User = require('./schemas/user')
const fs = require('fs')
const { Parser } = require('json2csv')

async function connectDB() {
    try {
        const con = await mongoose.connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch(err){
        console.log(err)
        process.exit(1)
    }
}
async function P1Q1() {
    await connectDB();
    let startDate = '2021-11-01';
    let endDate = '2021-11-30';
    var data = await GroupUser.find({
        createdAt: { $gte: new Date(`${startDate}T00:00:00`), $lte: new Date(`${endDate}T23:59:59`) },
    })
    .populate("groupId")
    .populate("userId")
    let filterGroupPrivate = data.filter(d => d.groupId.meta.isPrivate = true)
    let sortByGroupUsername = filterGroupPrivate.sort((a,b) => (a.groupId.name  < b.groupId.name ) ? -1 :
                                  (b.groupId.name  > a.groupId.name ) ?  1 :
                                  (a.userId.username > b.userId.username) ? 1 : -1
    )
    const listData = [];
    await Promise.all(sortByGroupUsername.map(async (data) => {
        listData.push({
            'Group Name': data.groupId.name, 
            'Username': data.userId.username, 
            'Email': data.userId.email
        })
    })); 
    const fields = Object.keys(listData[0])
    const csv = new Parser({fields})
    fs.writeFile("data.csv", csv.parse(listData), (err) => {
        if (err)
        console.log(err);
        else {
        console.log("P1Q1 successfully");
        }
    });
}
// P1Q1();
async function P1Q2() {
    await connectDB();
    const dataUser = await User.find()
    await Promise.all(dataUser.map(async (data) => {
        const filter = { _id: data._id }
        const update = { username: data.username.charAt(0).toUpperCase() + data.username.slice(1) }
        await User.findOneAndUpdate(filter, update); 
    }));    
    console.log("Q2 successfully");
}
// P1Q2();




