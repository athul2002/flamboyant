class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    };

    search()
    {
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{}

        this.query=this.query.find({...keyword});
        return this;
    }

    filter()
    {
        const queryCopy={...this.queryStr};

        // Removing some fields
        const removeField=["keyword","page","limit"];

        removeField.forEach(key=>delete queryCopy[key])

        // Filter for Price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

        this.query=this.query.find(JSON.parse(queryStr))
        return this;
    }
    pagination(productPerPage)
    {
        const currPage=Number(this.queryStr.page)||1;
        const skip=productPerPage*(currPage-1);
        this.query=this.query.limit(productPerPage).skip(skip);
        return this;
    }
};

module.exports=ApiFeatures