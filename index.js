import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app= express();
const port=5000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

 
app.set('view engine','ejs');
const out=[];

app.get("/", async  (req,res) =>{
  
    try{
       
        const result= await axios.get("https://date.nager.at/api/v3/AvailableCountries");
        console.log(result);
      

      
       
         res.render("list.ejs",{holiday:"please click button",resu:result.data,detail:"shhshsg"});
    } catch (error) {
      
        console.error(error);
          
    
    }
    })
       

    app.post("/", async (req, res) => {
        try {
            const selectedCountryCode = req.body.ccode;
            console.log(selectedCountryCode);
            const out=[];
            const result = await axios.get("https://api.breakingbadquotes.xyz/v1/quotes");
            const fin_result = await axios.get("https://date.nager.at/api/v3/AvailableCountries");
            const public_holiday = await axios.get(`https://date.nager.at/api/v3/NextPublicHolidays/${selectedCountryCode}`);
            
            console.log(result);
            out.push(public_holiday.data); // Assuming public_holiday.data is already parsed JSON
            console.log(out);
            res.render("list.ejs", { holiday: result.data, resu: fin_result.data, detail: out });
        } catch (error) {
            console.error(error);
        }
    
    });

app.listen(port, () =>{
    console.log("listenng to port ${port} ");
});