import { MoreHorizontal, Bookmark } from "lucide-react";
import { Collection } from "@/types/collection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    
    <div className="group relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video w-full bg-muted relative">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs">
          <Bookmark className="h-3 w-3 inline-block mr-1" />
          {collection.itemCount}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold truncate">{collection.title}</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-2">
          {collection.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}