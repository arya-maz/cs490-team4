import React from 'react';
import { Button } from "@/components/ui/button.tsx"
import jsPDF from 'jspdf';
import mammoth from 'mammoth';
import {Paperclip,LetterText, AArrowUp, FileUp} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {useToast} from "@/hooks/use-toast.ts"
import {Toaster} from "@/components/ui/toaster.tsx"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx"



export default function ResumeScreen() {

  const {toast} = useToast();
  const [resume, setResume] = React.useState(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [resumeTabValue, setResumeTabValue] = React.useState("fileUpload");
  const [resumeText, setResumeText] = React.useState("");
  const jobDescriptionCharLimit = 500;
  const resumeTextCharLimit = 1000;
  const [tabValue, setTabValue] = React.useState("resume");
  
  const uploadToBackend = (blob)=>{
    setTimeout(()=>{
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "tempFile"

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    },5000)
  }

  const convertTextToPDF = (text) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; // Page height
    const margin = 10; // Margin from the edges
    const lineHeight = 10; // Line height for text
    let y = margin; // Starting Y position for text

    const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2); // Split text to fit width

    lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
            // If the line exceeds the page height, add a new page
            doc.addPage();
            y = margin; // Reset Y position for new page
        }
        doc.text(line, margin, y); // Add text to the current position
        y += lineHeight; // Increment Y position for the next line
    });

    const pdfBlob = doc.output('blob'); // Generate the PDF as a Blob
    return pdfBlob;
};

  
  const handleTxtFile = (file)=>{
    const reader = new FileReader();
    reader.onload = ()=>{
      const text = reader.result;
      const pdfBlob = convertTextToPDF(text);
      uploadToBackend(pdfBlob);
    
    }
    reader.readAsText(file);
  }

  const handleDocxFile = (file)=>{
    const reader = new FileReader();
    reader.onload = async ()=>{
      const arrayBuffer = reader.result;
      const result = await mammoth.extractRawText({arrayBuffer});
      const pdfBlob = convertTextToPDF(result.value);
      uploadToBackend(pdfBlob);
    }
    reader.readAsArrayBuffer(file);
  }
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
  };

  const handleResumeUpload = () => {
    let title, description;

    if (!(resume || resumeText)) {
      title = "Upload Error";
      description = "Please select a file to upload.";
      toast({title:title, description:description});
      return;
    }
  
    const allowedTypes = ["application/pdf"]; // Allowed MIME types
    const fileType = resume.type;

    if (allowedTypes.includes(fileType)) {
      title = "Upload Success";
      description = `File: ${resume.name} uploaded successfully.`;
      setTabValue("jobDesc");

      // Proceed with the upload or further processing
      if(fileType === "text/plain"){
        handleTxtFile(resume)
      }else if(fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        handleDocxFile(resume)
      }else if(fileType === "application/pdf"){
        uploadToBackend(resume)
      }
    } else {
      title = "Upload Error";
      description = "Please upload a valid PDF or TXT file.";
    }
    toast({title:title, description:description});
  }

  const handleJobDescriptionChange = (e) => {
    const text = e.target.value;
    if(text.length <= jobDescriptionCharLimit) {
      setJobDescription(text);
    }
  }

  const handleResumeTextChange = (e) => {
    const text = e.target.value;
    if(text.length <= resumeTextCharLimit) {
      setResumeText(text);
    }
  }

  const handleTextUpload = () => {
    let title, description;
    if (!resumeText) {
      title = "Upload Error";
      description = "Please enter some text to upload.";
      toast({title:title, description:description});
      return;
    }else{
      title = "Upload Success";
      description = `Text uploaded successfully.`;
      let pdfBlob = convertTextToPDF(resumeText);
      uploadToBackend(pdfBlob);
      setTabValue("jobDesc");
      toast({title:title, description:description});
      return;
    }

  }

  const handleResumeInputType = (value) => {
    if(!value) return;
    setResume(null);
    setResumeText("");  
    setResumeTabValue(value)
    
  }
  return (
    <main>
      <TooltipProvider>
    <Tabs value={tabValue} onValueChange={(value)=>setTabValue(value)} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="resume" >Resume</TabsTrigger>
        <TabsTrigger value="jobDesc">Job Description</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>
              Make changes to your Resume here. Click upload when you're done.
            </CardDescription>
          </CardHeader>
         <div className='mx-8'> <Separator className="mb-5" /></div>
          <CardContent className="space-y-2"> 
            
            <ToggleGroup value={resumeTabValue} type="single" onValueChange={handleResumeInputType}>
     <Tooltip>
      <TooltipTrigger aschild>
      <ToggleGroupItem variant="outline" value="fileUpload" aria-label="Toggle bold">
        <Paperclip className="h-4 w-4" /> File Upload
      </ToggleGroupItem></TooltipTrigger>
      <TooltipContent>Upload a PDF or TXT file</TooltipContent>
      </Tooltip> 
     
      <ToggleGroupItem  variant="outline" value="textInput" aria-label="Toggle italic">
        <LetterText className="h-4 w-4" /> Text Input
      </ToggleGroupItem>
     
    </ToggleGroup>
            <div className="space-y-1">
            {resumeTabValue === "fileUpload" && <><Label htmlFor="resume">Resume File</Label>
           

            <Input id="resume" type="file" accept=".pdf,.txt,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleResumeChange}/></>}

            {resumeTabValue === "textInput" && <><Label htmlFor="resume">Resume Text</Label>
           

              <Textarea 
              id="current" 
              placeholder="Type or paste resume text here"
              value={resumeText}
              onChange={handleResumeTextChange}
              className="h-[200px]"
              />
              <div className="text-sm text-gray-500">
        {resumeText.length}/{resumeTextCharLimit} characters
      </div></>}
            </div>
          
          </CardContent>
          <CardFooter>
            {
              resumeTabValue === "fileUpload" &&
              <Button onClick={handleResumeUpload}><FileUp/>Upload</Button>}


          {
              resumeTabValue === "textInput" &&
              <Button onClick={handleTextUpload}><AArrowUp/>Upload</Button>}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="jobDesc">
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>
              Add your Job Description here. When done click calculate.
            </CardDescription>
          </CardHeader>
          <div className='mx-8'> <Separator className="mb-5" /></div>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Job Description</Label>
              <Textarea 
              id="current" 
              placeholder="Type or paste job description here"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              className="h-[200px]"
              />
              <div className="text-sm text-gray-500">
        {jobDescription.length}/{jobDescriptionCharLimit} characters
      </div>
            </div>
           
          </CardContent>
          <CardFooter>
            <Button>Calculate</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <Toaster/>
    </TooltipProvider>
    </main>
    
  );
}

const styles = {
  
};
