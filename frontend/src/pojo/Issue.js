class Issue{

    constructor(title, body){
        this.title=title;
        this.body=body;
        this.complete=false;
        this.status="backlog"
    }

    title;
    body;
    complete;
    status;
}

export default Issue;