<template>
    <div>
        <span>
            {{Label}}
        </span>
        <el-input
        type="text"
        v-model="control.lastname"
        :placeholder="Placeholder"
        style="margin-top: 5px; margin-bottom : 5px;"
        ></el-input>
    </div>
</template>

<script>
export default {
    props : {
        Label : String, 
        Placeholder: String,
        control : String
    }
}
</script>