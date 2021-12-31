<template>
    <div>
        <Navbar />
        <div style="margin-top: 100px;" class="container">
            <el-card shadow="always">
                <h3>Update User Information</h3>
                <EditForm :UpdateTask="UpdateTask" :onupdate="onupdate" />
            </el-card>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar"
import EditForm from "@/components/EditInformation/editform"
import {validate_user_post} from "@/store/validation/validate"
import {mapGetters} from "vuex"
export default {
    components: {
        Navbar, EditForm
    },
    data : () => ({
        UpdateTask: {
            firstname : '', lastname : ''
        }
    }),
    created() {
        this.UpdateTask.firstname = this.$route.query.obj.fname
        this.UpdateTask.lastname = this.$route.query.obj.lname
    },
    computed : {
        ...mapGetters({
            get_user_response: 'get_user_response'
        })
    },
    methods: {
        onupdate: function() {
            validate_user_post(this.UpdateTask.firstname, this.UpdateTask.lastname)
            .then(r => {
                if(r === "empty handed") {
                    alert("firstname or lastname is empty");
                    return false;
                }else{
                    this.$store.dispatch(`action_update_user`, {
                        object: this.UpdateTask,
                        id: this.$route.query.obj.id
                    }).then(() => {
                        if(this.get_user_response.data === "success update") {
                            alert("Successfully update")
                            this.$router.push({name : 'Home'})
                        }else{
                            alert("Account not found")
                        }
                    })
                }
            })
        }
    }
}
</script>