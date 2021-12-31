<template>
  <div>
    <Navbar />
    <div style="margin-top: 100px;" class="container">
        <el-card shadow="always">
            <div class="row">
              <div class="col-sm">
                <h3>User Data List</h3>
              </div>
              <div class="col-sm">
                <el-button
                type="primary"
                plain
                style="float: right; margin-top: 5px; margin-bottom : 5px;"
                @click="onadduser()"
                >Add new user</el-button>
              </div>
            </div>
            <Table :onEdit="onEdit" :ondelete="ondelete" :tableArray="userArray" />
        </el-card>

        <el-dialog
          title="Tips"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
          <div style="margin-top: 50px;" class="row">
            <div class="col-sm">
              <Primary Label="Enter firstname" Placeholder="Enter firstname" :control="task" />
            </div>
            <div class="col-sm">
              <Secondary Label="Enter lastname" Placeholder="Enter lastname" :control="task" />
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onconfirm()">Confirm</el-button>
          </span>
        </el-dialog>

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar"
import Table from "@/components/Table/Table"
import Primary from "@/components/TextField/PrimaryInfo"
import Secondary from "@/components/TextField/SecondaryInfo"
import {validate_user_post} from "@/store/validation/validate"
import {mapGetters} from "vuex"
export default {
  components: {
    Navbar, Table, Primary, Secondary
  },
  data: () => ({
    dialogVisible: false,
    task : {
      firstname : '', lastname: ''
    },
    userArray: []
  }),
  computed : {
    ...mapGetters({
      get_user_response : 'get_user_response', get_array_user_response : 'get_array_user_response'
    })
  },
  created() {
    this.getAllUser()
  },
  methods: {
    onEdit: function(id, fname, lname) {
      this.$router.push({name: 'Edit', query : {
        obj: {
          id: id, fname: fname, lname: lname
        }
      }})
    },
    ondelete: function(id) {
      this.$confirm('This will permanently delete the data. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            this.$store.dispatch(`action_delete_user`, {
              id: id
            }).then(() => {
              if(this.get_user_response.data === "success delete") {
                loading.close();
                 this.$notify({
                  title: 'Deletion Success',
                  message: 'Successfully Deleted',
                  type: 'success'
                });
                this.getAllUser()
              }
            })
          }, 2000)
        })
    },
    getAllUser : function() {
      this.$store.dispatch(`action_get_user`).then(() => {
        this.userArray = this.get_array_user_response.data
      })
    },
     handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onadduser: function() {
        this.dialogVisible = true
      },
      onconfirm() {
        validate_user_post(this.task.firstname, this.task.lastname)
        .then(r => {
          if(r === "empty handed") {
            alert("Empty firstname or lastname");
          }else{
            this.$store.dispatch(`action_post_user`, {
              object: this.task
            }).then(() => {
              
              if(this.get_user_response.data === "success") {
                alert("Succesfully added");
                this.getAllUser()
                this.dialogVisible = false
              }
            })
          }
        })
      }
  }
}
</script>