import { TMealFood } from '@godiet-entities';
import { Card } from '@godiet-ui/Card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@godiet-ui/Table';

interface ContentProps {
  mealFoods: TMealFood[];
}

export function Content(props: ContentProps) {
  const { mealFoods } = props;

  return (
    <Card.Content>
      <Table>
        <TableCaption>Informações alimentares por refeição.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-[1px]">Alimentos</TableHead>
            <TableHead>Medida</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealFoods.map((mealFood) => (
            <TableRow key={mealFood.id}>
              <TableCell className="border-r-[1px]">{mealFood.name}</TableCell>
              <TableCell>
                {mealFood.qty} {mealFood.measure.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card.Content>
  );
}
