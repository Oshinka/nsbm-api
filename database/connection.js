const mongoose = require('mongoose');

const url = 'mongodb+srv://Dumindu:S2WgbLVpkYI8Yk8E@clustermdb.wdgcl.mongodb.net/nsbm?retryWrites=true&w=majority';
mongoose.connect(url, {useUnifiedTopology:true ,useNewUrlParser:true, useCreateIndex:true})