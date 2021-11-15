from enum import Enum
from typing import List

# Definition of mapping from law branch name to a numeric identifier

class LawBranch(Enum):
    """Mapping to a Law Branch and an identification. The enum also stores
    the law branch name in a free text form.
    """

    Penal = (0, 'Direito Penal (Direito Processual Penal)')
    Administrativo = (1, 'Direito Administrativo (Licitações, Contratos Administrativos, Servidores, Desapropriação, Tribunal de Contas, Improbidade, etc.)')
    Tributario = (2, 'Direito Tributário/Direito Financeiro')
    Civil = (3, 'Direito Civil (Direito Comercial/Direito de Família)')
    Previdenciario = (4, 'Direito Previdenciário')
    Trabalho = (5, 'Direito do Trabalho')
    Processual_Civil = (6, 'Direito Processual Civil')
    Eleitoral = (7, 'Direito Eleitoral')
    Consumidor = (8, 'Direito do Consumidor')
    Internacional = (9, 'Direito Internacional (Público ou Privado)')
    Militar = (10, 'Direito Militar')
    Economico = (11, 'Direito Econômico (Direito concorrencial e Agências Reguladoras Setoriais, Intervenção no Domínio Econômico)')
    Ambiental = (12, 'Direito Ambiental')

    def get_identifier(self) -> int:
        """Retrieves the identifier number for this instance of LawBranch.

        Returns:
            int: identifier of this instance of LawBranch
        """
        return self.value[0]
    
    @staticmethod
    def get_all_names() -> List[str]:
      """Retrieves a list of all names defined in LawBranch enum.

        Returns:
          List[str]: the list of names.

      """
      names = []
      for law_branch in LawBranch:
        names.append(law_branch.value[1])
      return names
    
    @staticmethod
    def get_number_of_branches() -> int:
        """Retrieves the number of branches defined in LawBranch enum.

        Returns:
            int: number of branches
        """
        return len(LawBranch)
    
    @staticmethod
    def get_lawbranch_by_index(index) -> str:
      """Retrieves the name of a LawBranch given the index number.

        Returns:
            str: name of the LawBranch
        """
      for law_branch in LawBranch:
        if law_branch.value[0] == index:
          return law_branch.value[1]
