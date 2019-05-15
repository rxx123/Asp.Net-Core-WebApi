<template>
    <div>
        <section  class="main-content-wrapper wrapper" >
            <section id="main-content" >
                <div class="row">
                    <div class="col-md-12">
                        <!-- 查询 -->
                        <div class="demo-input-size">
                            设备名称：<el-input placeholder="请输入设备名称" v-model="keywordsDeviceName" style="width: 300px;"></el-input>
                            设备型号：<el-input placeholder="请输入设备型号" v-model="keywordsDeviceType" style="width: 300px;"></el-input>
                            设备分类：<el-input placeholder="请输入设备分类" v-model="keywordsDeviceClassify" style="width: 300px;"></el-input>
                            <el-button type="danger" class="danger" slot="append" icon="el-icon-search" @click="query"></el-button>
                            <el-button type="primary" @click="dialogCreateVisible = true">添加</el-button>
                            <el-button type="primary" icon="delete" :disabled="selected.length==0" @click="removeDevices()"  >删除</el-button>
                        </div>
                        <!-- 操作 -->
                        <!-- <ul class="btn-edit fl">
                            <li >
                                <el-button type="primary" @click="dialogCreateVisible = true">添加</el-button>
                                <el-button type="primary" icon="delete" :disabled="selected.length==0" @click="removeUsers()"  >删除</el-button>
                            </li>
                        </ul> -->
                        <!-- 用户列表-->
                        <el-table ref="multipleTable" :data="tableData" height="600" border style="width: 100%;margin-top:20px;" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="50" fixed></el-table-column>
                           <!-- <el-table-column label="序号" type="index" show-overflow-tooltip width="50" fixed></el-table-column> -->
                           <el-table-column  label="序号"   type="index"    width="50"     align="center" fixed>
                                <template slot-scope="scope">
                                    <span>{{(filter.currentPage - 1) * filter.per_page + scope.$index + 1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="deviceCode" label="设备代码" width="180" sortable fixed></el-table-column>
                            <el-table-column prop="deviceClassify" label="设备分类" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceName" label="设备名称" width="180"></el-table-column>
                            <el-table-column prop="deviceType" label="设备型号" width="180"></el-table-column>
                            <el-table-column prop="belongOrgan" label="所属机构" width="180"></el-table-column>
                            <el-table-column prop="belongStation" label="所属站" width="180"></el-table-column>
                            <el-table-column prop="commissioningDate" label="投产日期" width="180"></el-table-column>
                            <el-table-column prop="manufacturer" label="生产厂家" width="180"></el-table-column>
                            <el-table-column prop="deviceStatus" label="设备状态" width="180"></el-table-column>
                            <el-table-column prop="remark" label="备注" width="180"></el-table-column>
                            <el-table-column prop="viewPhoto" label="照片名称" width="180"></el-table-column>
                            <el-table-column  label="操作"     width="250" fixed="right">
                                <el-button type="primary" size="mini" @click="lookPhoto(row)">查看照片</el-button>
                                <el-button type="primary" size="mini" @click="removeDevice(row)">删除</el-button>
                                <el-button type="primary" size="mini" @click="setDevice(row)">编辑</el-button>
                            </el-table-column>
                        </el-table>
                        <el-pagination background
                            @size-change="pageSizeChange"
                            @current-change="pageCurrentChange"
                            :current-page="filter.currentPage"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="filter.per_page"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total_rows">
                        </el-pagination>
                    </div>
                </div>
            </section>
        </section>
        <!-- 创建设备信息 begin-->
        <el-dialog title="创建设备信息" :visible.sync="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="reset" >
            <el-form id="#create" :model="create" ref="create" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设备代码" prop="deviceCode">
                            <el-input v-model="create.deviceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="设备分类" prop="deviceClassify">
                            <el-input v-model="create.deviceClassify"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设备名称" prop="deviceName">
                            <el-input v-model="create.deviceName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="设备型号" prop="deviceType">
                            <el-input v-model="create.deviceType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属机构" prop="belongOrgan">
                            <el-input v-model="create.belongOrgan"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="所属站" prop="belongStation">
                            <el-input v-model="create.belongStation"></el-input>
                        </el-form-item>
                       </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="投产日期" prop="commissioningDate">
                            <el-input v-model="create.commissioningDate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="生产厂家" prop="manufacturer">
                            <el-input v-model="create.manufacturer"></el-input>
                        </el-form-item>
                     </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设备状态" prop="deviceStatus">
                            <el-input v-model="create.deviceStatus"></el-input>
                        </el-form-item>
                     </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="create.remark"></el-input>
                        </el-form-item>
                     </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                         <el-form-item label="照片名称" prop="viewPhoto">
                            <el-input v-model="create.viewPhoto"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="createLoading" @click="createDevice">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改设备信息 begin-->
        <el-dialog title="修改设备信息" :visible.sync="dialogUpdateVisible"  :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form id="#update" :model="update" ref="update" label-width="100px">
                 <el-row>
                    <el-col :span="12">
                        <el-form-item label="设备代码" prop="deviceCode">
                            <el-input v-model="update.deviceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="设备分类" prop="deviceClassify">
                            <el-input v-model="update.deviceClassify"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设备名称" prop="deviceName">
                            <el-input v-model="update.deviceName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="设备型号" prop="deviceType">
                            <el-input v-model="update.deviceType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属机构" prop="belongOrgan">
                            <el-input v-model="update.belongOrgan"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="所属站" prop="belongStation">
                            <el-input v-model="update.belongStation"></el-input>
                        </el-form-item>
                       </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="投产日期" prop="commissioningDate">
                            <el-input v-model="update.commissioningDate"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="生产厂家" prop="manufacturer">
                            <el-input v-model="update.manufacturer"></el-input>
                        </el-form-item>
                     </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="设备状态" prop="deviceStatus">
                            <el-input v-model="update.deviceStatus"></el-input>
                        </el-form-item>
                     </el-col>
                    <el-col :span="12"> 
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="update.remark"></el-input>
                        </el-form-item>
                     </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                         <el-form-item label="照片名称" prop="viewPhoto">
                            <el-input v-model="update.viewPhoto"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="updateLoading" @click="updateDevice">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestEquipment } from '../../api/api';
    export default {
        data() {           
            return {
                total_rows: 0,
                tableData: [],
                create: {
                    deviceCode: '',
                    deviceClassify: '',
                    deviceName: '',
                    deviceType: '',                    
                    belongOrgan: '',
                    belongStation: '',
                    commissioningDate: '',
                    manufacturer: '',
                    deviceStatus:'',
                    remark:'',
                    viewPhoto:''
                },
                update:{
                    deviceCode: '',
                    deviceClassify: '',
                    deviceName: '',
                    deviceType: '',                    
                    belongOrgan: '',
                    belongStation: '',
                    commissioningDate: '',
                    manufacturer: '',
                    deviceStatus:'',
                    remark:'',
                    viewPhoto:''
                },    
                filter: {
                    per_page: 10, // 页大小
                    currentPage: 1, // 当前页
                    keywordsDeviceName:'',
                    keywordsDeviceType:'',
                    keywordsDeviceClassify:''
                },          
                multipleSelection: [],
                keywordsDeviceName: '', //搜索框的关键字内容
                keywordsDeviceType:'',
                keywordsDeviceClassify:'',
                dialogCreateVisible: false, //创建对话框的显示状态
                dialogUpdateVisible: false, //编辑对话框的显示状态
                selected: [], //已选择项
                createLoading: false,
                updateLoading: false,
            }
        },
        created: function(){
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData();
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(function(row)  {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            callbackFunction(result) {
                alert(result + "aaa");
            },
            fetchData(){ //获取数据
            //   this.$http.jsonp("http://localhost:8080/wproject/view/enterprise!getListByParam.action",{//跨域请求数据
            //     params: {
            //         keywords:this.keyword//输入的关键词
            //     },
            //     jsonpCallback:'callbackFunction'//这里是callback
            //   }).then(function(res) {//请求成功回调，请求来的数据赋给searchList数组
            //     this.total = res.body.count;
            //     this.currentPage = res.body.curr;
            //     this.tableData = res.body.data;
            //     console.info(res);
            //   },function(res) {//失败显示状态码
            //     alert("res.status:"+res.status)
            //   })
                requestEquipment(this.filter).then(data => {
                    this.logining = false;
                    if (data.result) {                        
                        this.total_rows = data.total;
                        this.filter.currentPage = data.currentPage;
                        this.tableData =data.data;
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }
                });
                // this.total = 10;
                // this.currentPage = 1;
                // this.tableData = [{
                //     deviceCode: 'ABC1234567',
                //     deviceClassify: '道岔',
                //     deviceName: '提速道岔',
                //     deviceType: 'DC19990',                    
                //     belongOrgan: '东站信号工区',
                //     belongStation: '西安东站',
                //     commissioningDate: '2001-01-01',
                //     manufacturer: '北京xx有限公司',
                //     deviceStatus:'启用',
                //     remark:'阿斯顿发送到'
                // },
                // {
                //     deviceCode: 'ABC1234567',
                //     deviceClassify: '道岔',
                //     deviceName: '提速道岔',
                //     deviceType: 'DC19990',                    
                //     belongOrgan: '东站信号工区',
                //     belongStation: '西安东站',
                //     commissioningDate: '2001-01-01',
                //     manufacturer: '北京xx有限公司',
                //     deviceStatus:'启用',
                //     remark:'阿斯顿发送到'
                // }];
            },
            pageSizeChange(val){
               this.filter.per_page = val;
              this.fetchData();
            },
            pageCurrentChange(val){
              this.filter.currentPage = val;
              this.fetchData();
            },
            searchFieldChange(val) {
                this.placeholder=placeholders[val];
                console.log(`搜索字段： ${val} `);
            },
            //编辑
            setDevice(user){
                this.dialogUpdateVisible=true;
                // this.currentId=user.id;
                // this.update.name=user.name;
                // this.update.phone=user.phone; 
                // this.update.email=user.email;
                // this.update.is_active=user.is_active;                
            },
             // 重置表单
            reset() {
                this.$refs.create.resetFields();
            },
            query(){
                this.filter.name='';
                this.filter.username='';
                this.filter.phone='';
                this.filter[this.select]=this.keywords;
                this.getDevices();
            },
             // 创建
            createDevice(){
                // 主动校验
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        this.create.id=getuuid();
                        this.createLoading=true;
                        var resource = this.$resource(this.url);
                        resource.save(this.create)
                            .then((response) => {
                            this.$message.success('创建用户成功！');
                            this.dialogCreateVisible=false;
                            this.createLoading=false;
                            this.reset();
                            this.getUsers();
                    })
                    .catch((response) => {
                            var data=response.data;
                            if(data instanceof Array){
                                this.$message.error(data[0]["message"]);
                            }
                            else if(data instanceof Object){
                                this.$message.error(data["message"]);
                            }
                            this.createLoading=false;
                        });
                    }
                    else {
                        return false;
                    }
                });
            },
            // 获取列表
            getDevices() {
                this.loading = true;
                var resource = this.$resource(this.url);
                resource.query(this.filter)
                    .then((response) => {
                    this.users = response.data.datas;
                    this.total_rows = response.data.total_rows;
                    this.loading = false;
                    this.selected.splice(0,this.selected.length);
                })
                .catch((response)=> {
                        this.$message.error('错了哦，这是一条错误消息');
                    this.loading = false;
                });
            },
             // 更新
            updateDevice() {
                this.$refs.update.validate((valid) => {
                    if (valid) {
                        this.updateLoading=true;
                        var actions = {
                            update: {method: 'patch'}
                        }
                        var resource = this.$resource(this.url,{},actions);
                        resource.update({"ids":this.currentId},this.update)
                            .then((response) => {
                            this.$message.success('修改用户资料成功！');
                            this.dialogUpdateVisible=false;
                            this.updateLoading=false;
                            this.getUsers();
                    })
                    .catch((response) => {
                        var data=response.data;
                        console.log(data);
                        if(data instanceof Array){
                            this.$message.error(data[0]["message"]);
                        }
                        else if(data instanceof Object){
                            this.$message.error(data["message"]);
                        }
                        this.updateLoading=false;
                    });
                    }
                    else {
                        return false;
                    }
                });
            },
            //删除单个
            removeDevice(user) {
                this.$confirm('此操作将永久删除用户 ' + user.username + ', 是否继续?', '提示', { type: 'warning' })
                    .then(() => {
                    // 向请求服务端删除
                    var resource = this.$resource(this.url + "{/id}");
                    resource.delete({ id: user.id })
                        .then((response) => {
                        this.$message.success('成功删除了用户' + user.username + '!');
                        this.getUsers();
                    })
                    .catch((response) => {
                            this.$message.error('删除失败!');
                    });
                })
                .catch(() => {
                    this.$message.info('已取消操作!');
                });
            },
             //删除多个用户
            removeDevices() {
                this.$confirm('此操作将永久删除 ' + this.selected.length + ' 个用户, 是否继续?', '提示', { type: 'warning' })
                    .then(() => {
                    console.log(this.selected);
                    var ids = [];
                    //提取选中项的id
                    $.each(this.selected,(i, user)=> {
                            ids.push(user.id);
                        });
                    // 向请求服务端删除
                    var resource = this.$resource(this.url);
                    resource.remove({ids: ids.join(",") })
                        .then((response) => {
                            this.$message.success('删除了' + this.selected.length + '个用户!');
                            this.getUsers();
                    })
                    .catch((response) => {
                            this.$message.error('删除失败!');
                    });
                })
                .catch(() => {
                    this.$Message('已取消操作!');
                });
            }
        }
    }
</script>
<style>
    @import '../../assets/plugins/bootstrap/css/bootstrap.min.css';
    @import '../../assets/css/global.css';
    @import '../../assets/css/main.min.css';
    .el-table th {
        text-align: center;
    }
    .el-table tbody tr td {
        text-align: center;
    }
    /* .el-table tbody tr td:first-child {
        text-align: center;
    } */
</style>