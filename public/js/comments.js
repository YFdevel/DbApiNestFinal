const app = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        titleComment: 'Комментарии',
        userId: new URLSearchParams(window.location.search.substring(1)).get("userId"),
        postId: new URLSearchParams(window.location.search.substring(1)).get("postId"),
        name: '',
        comment: '',
        tempForUpdate:{},
        comments: [],
        socket: null
    },
    methods: {
        sendComment() {
            if (this.validateInputComment()) {
                const commentObj = {
                    userId: this.userId,
                    postId: this.postId,
                    text: this.comment
                }
                console.log(commentObj)
                this.socket.emit('commentToServer', commentObj);
                this.comment = '';

            }
        },
        setInitialComments(comments) {
            this.comments = comments;
        },
        receivedComment(comment) {
            this.comments.push(comment)
        },
        validateInputComment() {
            return this.comment.length > 0
        },
        deleteComment(e) {
            const commentId = e.target.getAttribute("value");
            const ownerId = e.target.getAttribute("user");
            const data={
                userId:this.userId,
                ownerId:ownerId,
                commentId:commentId
            }
                this.socket.emit("deleteCommentToServer", data);
                 // window.location.reload();
        },
        changeInputStatus(e){
            const ownerId = e.target.getAttribute("user");
            if(ownerId===this.userId){
                e.target.removeAttribute("readonly");
            }
        },
        prepareUpdateComment(e){
            const commentId = e.target.getAttribute("comment");
                this.tempForUpdate={
                    id:commentId,
                    userId: this.userId,
                    postId: this.postId,
                    text: e.target.value
                }

        },
        updateComment(){
            this.socket.emit('updateCommentToServer', this.tempForUpdate);
        }
    },
    created() {
        this.socket = io('http://localhost:3000');

        this.socket.emit('postIdToServer', this.postId);

        this.socket.on('initialComments', (comments) => {
            this.setInitialComments(comments);
        })

        this.socket.on('commentToClient', (comment) => {
            this.receivedComment(comment);
        })

    }

})