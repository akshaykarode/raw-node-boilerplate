class CustomError extends Error {
    constructor(name, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.name = name;
        this.statusCode = 0;
        this.status = '';
        this.message = ''
        this.date = new Date();
        this.details = params;
        this.set();
        this.wrap();
    }
    set(){
        switch(this.name){
            case 'INVALIDCONTENT':
                this.statusCode=422;
                this.status='FAIL';
                this.message='Invalid File Content.';
                break;
            case 'DOESNOTEXISTS':
                this.statusCode=422;
                this.status='FAIL';
                this.message='Content Does Not Exists.';
                break;
            case 'INVALIDCURRENCY':
                this.statusCode=422;
                this.status='FAIL';
                this.message='Content Currency Does Not Match.';
                break;
            case 'ALREADYAPPROVED':
                this.statusCode=422;
                this.status='FAIL';
                this.message='Statement is Already Approved';
                break;
            case 'MIDDLEWARE':
                this.statusCode=500;
                this.status='FAIL';
                this.message='Something went wrong !';
                break;
            default:
                this.statusCode=500;
                this.status="FAIL";
                this.message="This is unknown Custom Error.";
                break;
        }
    }
    /*
        Wrap any Generic Errors into CustomError.
     */
    wrap(){
        if((typeof this.name==="object") && (this.name instanceof Error)){
            let errorObject = this.name;
            this.name=''
            this.statusCode=500;
            this.status="FAIL";
            this.details=[{
                name:errorObject.name,
                stack:errorObject.stack,
                message:errorObject.message,
                description:errorObject.toString(),   
            }]
        }
    }

}

module.exports=CustomError