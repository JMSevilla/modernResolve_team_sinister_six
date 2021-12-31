<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableArray" :key="item.userID">
                <th scope="row">{{item.userID}}</th>
                <td>{{item.firstname}}</td>
                <td>{{item.lastname}}</td>
                <td>{{item.createdAt}}</td>
                <td>
                    <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="onEdit(item.userID, item.firstname, item.lastname)"
                    >Edit</el-button> &nbsp;

                    <el-button
                    type="danger"
                    plain
                    size="small"
                    @click="ondelete(item.userID)"
                    >Delete</el-button>
                </td>
                </tr>
            </tbody>
            </table>
    </div>
</template>

<script>
export default {
    props : {
        tableArray : Array,
        ondelete: Function,
        onEdit: Function
    }
}
</script>