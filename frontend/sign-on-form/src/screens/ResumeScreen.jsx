import React, { useState } from 'react';
import { Button } from "@/components/ui/button2.tsx"
import jsPDF from 'jspdf';
import mammoth from 'mammoth';
import {Paperclip,LetterText, AArrowUp, FileUp} from "lucide-react";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card2.tsx"
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



export default function ResumeScreen({setAverageFitScoreData,setFeedBackLoaded,setFeedBackLoading,setProgress, setFeedBack, setFitScore}) {

  const {toast} = useToast();
  const [resume, setResume] = React.useState(null);
  const [jobDescription, setJobDescription] = React.useState("");
  const [resumeTabValue, setResumeTabValue] = React.useState("fileUpload");
  const [resumeText, setResumeText] = React.useState("");
  const jobDescriptionCharLimit = 5000;
  const resumeTextCharLimit = 10000;
  const [tabValue, setTabValue] = React.useState("resume");
  const base_url = "http://localhost:8000";

  //let ud;
  
    //write code to upload the blob to the backend endpoint http://127.0.0.1:8000/ the endpoint accepts json resume_file *string($binary)
    const [ud, setUd] = useState(null);

    const uploadToBackend = async (blob) => {
      const formData = new FormData();
      formData.append('resume_file', blob);
    
      try {
        const response = await fetch(`${base_url}/api/resume-upload`, {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json(); // Should have uid
        console.log('Upload Response:', data);
    
        if (data && data.uid) {
          setUd(data.uid); // Update the state variable 'ud'
          console.log('UID:', data.uid); // Should print the UID
        }
    
        return true;
      } catch (error) {
        console.error('Error uploading resume:', error);
        return false;
      }
    };

    const addNewFitScore = (setAverageFitScoreData, newScore) => {
      setAverageFitScoreData((prev) => {
        // Find the next upload number
        const nextUpload = (prev.length > 0 ? parseInt(prev[prev.length - 1].upload) + 1 : 1).toString();
    
        // Create a new object
        const newObject = { upload: nextUpload, score: newScore };
    
        // Return the updated array
        return [...prev, newObject];
      });
    };

    const uploadJobDescription = async () => {
      if (!ud) {
        console.error('UID is not set yet!');
        return;
      }
    
      const payload = {
        uid: ud,
        job_description: jobDescription,
      };
      let title, description;
      setProgress(0);
      setFeedBackLoading(true);
    
      // Start a fake progress interval
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + 10;
          }
          clearInterval(progressInterval);
          return prev;
        });
      }, 200);
    
      try {
        const response = await fetch(`${base_url}/api/job-description`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        const result = await fetchFitScoreAndFeedback(data.uid);
    
        if (result) {
          const { feedBack, fitScore } = result;
          setFeedBack(feedBack);
          setFitScore(fitScore);
        }
    
        title = "Upload Success";
        description = `Job description uploaded successfully.`;
        setFeedBackLoaded(true);
        setFeedBackLoading(false);
        setProgress(100);
        toast({ title: title, description: description });
    
        addNewFitScore(setAverageFitScoreData, 8);
        setJobDescription("");
        setTabValue("resume");
        setResumeText("");
        setResume(null);
      } catch (error) {
        title = "Upload Error";
        description = "Something went wrong. Please try again.";
        toast({ title: title, description: description });
      }
    };

    
    const fetchFitScoreAndFeedback = async (sendUid) => {
      try {
        const response = await axios.post('http://localhost:8000/api/analyze', { uid: sendUid });
        const feedBack = response.data.feedback;
        const fitScore = response.data.fit_score;
        console.log("response: ", feedBack, fitScore);
        return { feedBack, fitScore };
      } catch (error) {
        console.error("Error fetching data: ", error);
        return false;
      }
    };
    

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
      let valid = uploadToBackend(pdfBlob);
      return valid;
    
    }
    reader.readAsText(file);
  }

  const handleDocxFile = (file)=>{
    const reader = new FileReader();
    reader.onload = async ()=>{
      const arrayBuffer = reader.result;
      const result = await mammoth.extractRawText({arrayBuffer});
      const pdfBlob = convertTextToPDF(result.value);
      let valid = uploadToBackend(pdfBlob);
      return valid;
    }
    reader.readAsArrayBuffer(file);
  }
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
  };

  const handleResumeUpload = () => {
    let title, description;
    let valid = false;

    if (!(resume || resumeText)) {
      title = "Upload Error";
      description = "Please select a file or paste text to upload.";
      toast({title:title, description:description});
      return;
    }
  
    const allowedTypes = ["application/pdf", "text/plain","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; // Allowed MIME types
    const fileType = resume.type;

    if (allowedTypes.includes(fileType)) {
      
      setTabValue("jobDesc");

      // Proceed with the upload or further processing
      if(fileType === "text/plain"){
        handleTxtFile(resume)
      }else if(fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        handleDocxFile(resume)
      }else if(fileType === "application/pdf"){
        valid = uploadToBackend(resume)
      }
    
      
      
    }
    if(valid){
      title = "Upload Success";
      description = resume ?`File: ${resume.name} uploaded successfully.`: "Text uploaded successfully.";
    }else{
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
      <TooltipContent>Upload a PDF, docx or TXT file</TooltipContent>
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
            <Button onClick={uploadJobDescription}>Calculate</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <Toaster/>
    </TooltipProvider>
    </main>
    
  );
}


