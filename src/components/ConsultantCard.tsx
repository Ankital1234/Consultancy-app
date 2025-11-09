import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, IndianRupee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Consultant } from '@/types';
import { formatINR } from '@/utils/formatINR';

interface ConsultantCardProps {
  consultant: Consultant;
  index?: number;
}

const ConsultantCard = ({ consultant, index = 0 }: ConsultantCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link to={`/consultant/${consultant.id}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full border-border">
          <CardContent className="p-0">
            <div className="relative h-48 overflow-hidden">
              <img
                src={consultant.profilePicture}
                alt={consultant.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-background/90 text-foreground border-0">
                  <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                  {consultant.rating}
                </Badge>
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {consultant.name}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {consultant.specialization}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {consultant.bio}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {consultant.yearsOfExperience} years
                </div>
                <div className="flex items-center text-sm font-semibold text-primary">
                  <IndianRupee className="h-4 w-4" />
                  {formatINR(consultant.hourlyRate)}/hr
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ConsultantCard;
