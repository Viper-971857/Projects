class ApiFeatures {
    constructor(query,queyString){
        this.query = query;
        this.queyString = queyString;
    }

    // SEARCH FEATURE
    search(){
        const keyword = this.queyString.keyword ? {
            name:{
                $regex:this.queyString.keyword,
                $options:"i"
            }
        } : {}
    
        this.query = this.query.find({...keyword});
        return this

    }

    // FILTER FEATURE
    filter(){

        const queryCopy = {...this.queyString}
        
        // REMOVING SOME FIELDS FOR CATEGORY
        const RemoveFields = ["keyword","page","limit"];

        RemoveFields.forEach(key => delete queryCopy[key]);

        // FILTER FOR PRICE AND RATINGS
        let queyString = JSON.stringify(queryCopy);
        queyString = queyString.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);

        
        this.query = this.query.find(JSON.parse(queyString));
        return this;
    }

    // PAGINATION
    Pagination(ResultPerPage){

        const CurrentPage = Number(this.queyString.page) || 1;

        const skip = ResultPerPage * (CurrentPage - 1);

        this.query = this.query.limit(ResultPerPage).skip(skip);

        return this;

    }

}



module.exports = ApiFeatures;