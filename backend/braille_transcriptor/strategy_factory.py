

class StrategyFactory:

    def get_strategy(self, strategy, grade):
        """
        Create (initiate) a strategy
        """
        pass


class StrategyFactoryConcrete(StrategyFactory):

    def get_strategy(self, strategy, grade):
        """
        Intiate and return the strategy object for the specified language and grade
        """
        if (grade == 1):
            return strategy.value.grade1
        elif (grade == 2):
            return strategy.value.grade2
        else:
            raise Exception("enter a valid grade (1 or 2)")
