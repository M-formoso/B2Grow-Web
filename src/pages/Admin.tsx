import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Admin = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      toast.error("Por favor selecciona un archivo de video válido");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");

    try {
      // Upload to Supabase Storage
      const fileName = `video-b2grow-${Date.now()}.mp4`;
      const { data, error } = await supabase.storage
        .from("videos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      setUploadStatus("success");
      setUploadProgress(100);
      toast.success("Video subido exitosamente");
      
      console.log("Video URL:", publicUrl);
      
    } catch (error: any) {
      console.error("Error uploading video:", error);
      setUploadStatus("error");
      toast.error("Error al subir el video: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Panel de Administración
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Sube el video principal de B2Grow
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={uploading}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  {uploadStatus === "idle" && (
                    <>
                      <Upload className="w-16 h-16 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-semibold">
                          {uploading ? "Subiendo..." : "Haz clic para seleccionar un video"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Soporta archivos MP4, MOV, AVI (sin límite de tamaño)
                        </p>
                      </div>
                    </>
                  )}
                  
                  {uploadStatus === "success" && (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-500" />
                      <div>
                        <p className="text-lg font-semibold text-green-500">
                          Video subido exitosamente
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          El video está listo para usarse en el sitio
                        </p>
                      </div>
                    </>
                  )}
                  
                  {uploadStatus === "error" && (
                    <>
                      <XCircle className="w-16 h-16 text-red-500" />
                      <div>
                        <p className="text-lg font-semibold text-red-500">
                          Error al subir el video
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Por favor intenta nuevamente
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Subiendo: {uploadProgress}%
                  </p>
                </div>
              )}

              {uploadStatus === "success" && (
                <Button
                  onClick={() => {
                    setUploadStatus("idle");
                    setUploadProgress(0);
                  }}
                  className="w-full"
                >
                  Subir otro video
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
