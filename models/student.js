import mongoose from "mongoose"//student collection ek handle krai

const studentSchema = new mongoose.Schema({  ////ek ek database wla schema wens , mehi mongodb wlt scheme ekk hdgni

    name : String, 
    age : Number,
    city : String
})
//mongoose wlt theren wdyt json wisthryk dei


const Student = mongoose.model("Student", studentSchema) //mongoose.model()functio ek run krma, mokkheri collection ekk control krnn remote ekk hadenw me wdyt dunnm
                               //collection name ek, mehi collection eke thyna datawla type wge(schema ekk--meka attribute wge collection eke)

export default Student //export default ekk withrai ek file ekkt thynn plwn