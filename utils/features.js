class APIFeatures {
    constructor(query,queryString)
    {
      this.query= query
      this.queryString = queryString
    }
  
    filter()
    {
  
      const queryObj = {...this.queryString}
      const excludedFields = ["page","sort","limit","fields"]
      
      //remove excluded fields from array
      excludedFields.forEach(el=> delete queryObj[el])
      
      //Advance filtering
      const queryStr = JSON.stringify(queryObj)
      const queryStrReplace = queryStr.replace(/\b(lt|gt|lte|gte)\b/g,match=> `$${match}`)
      
      this.query.find(JSON.parse(queryStrReplace)) //later await bcz to make chaining
  
      return this
      
    }
  
    sort()
    {
      if(this.queryString.sort)
      {
      const sortBy = this.queryString.sort.split(",").join(" ")
      this.query = this.query.sort(sortBy)
      }
      else
      {
        this.query = this.query.sort("-createdAt")
      }
  
      return this
    }
  
    fields()
    {
      if(this.queryString.fields)
      {
      const field = this.queryString.fields.split(",").join(" ")
      this.query = this.query.select(field)
      }
      else
      {
        this.query = this.query.select("-__v")
      }
      return this
    }
  
    paginate()
    {
      const page = (this.queryString.page)*1 || 1
      const limit = (this.queryString.limit)*1 || 100
      const skip = (page-1)*limit
      this.query = this.query.skip(skip).limit(limit)
  
      return this
    }
  
  }

  module.exports = APIFeatures