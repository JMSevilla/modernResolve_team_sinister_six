<template>
    <div>
        <div style="margin-top: 20px;" class="row">
            <div class="col-sm">
                <span>
                    Update firstname
                </span>
                <el-input
                type="text"
                clearable
                v-model="UpdateTask.firstname"
                placeholder="Update your firstname"
                style="margin-top: 10px; margin-bottom: 10px"
                ></el-input>
            </div>
            <div class="col-sm">
                <span>
                    Update lastname
                </span>
                <el-input
                type="text"
                clearable
                v-model="UpdateTask.lastname"
                placeholder="Update your lastname"
                style="margin-top: 10px; margin-bottom: 10px"
                ></el-input>
            </div>
        </div>
        <el-button
        type="primary"
        plain
        round
        style="float: right; margin-top: 10px; margin-bottom : 10px;"
        size="medium"
        @click="onupdate()"
        >Update</el-button>
    </div>
</template>

<script>
export default {
    props : {
        UpdateTask : Object,
        onupdate: Function
    }
}
</script>