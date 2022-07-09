import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "posterValidation" })
export class PosterValidationPipe implements PipeTransform {
    public transform(imageSrc: string): string {
        if (imageSrc && imageSrc !== "N/A")
            return imageSrc;
        else return "./assets/poster-placeholder.png";
    }
}
